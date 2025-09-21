import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
interface RequestWithApplication extends Request {
  user?: any;
  application?: any;
}

@Injectable()
export class HeaderAuthGuard implements CanActivate {
  constructor(private prisma: PrismaService, private configService: ConfigService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithApplication>();
    const applicationApiKey = request.headers['x-api-key'] as string;
    const applicationId = request.headers['app-id'] as string;
    const userId = request.headers['user-id'] as string;

    // Check if this is a chat endpoint
    const isChatEndpoint = request.url?.startsWith(`${this.configService.get('API_VERSION')}/chat`);

    if (!applicationApiKey) {
      throw new UnauthorizedException('API key is required');
    }

    if (!applicationId) {
      throw new UnauthorizedException('App ID is required');
    }

    // For chat endpoints, user-id is compulsory
    if (isChatEndpoint && !userId) {
      throw new UnauthorizedException('User ID is required for chat endpoints');
    }

    const application = await this.prisma.application.findUnique({
      where: {
        apiKey: applicationApiKey,
        id: applicationId
      },
      include: { users: true }
    });

    if (!application) {
      throw new UnauthorizedException('Invalid API key or App ID');
    }

    if (!application.isActive) {
      throw new UnauthorizedException('Application is inactive');
    }

    // Always set the application in the request
    request.application = application;

    // For chat endpoints, validate that the user belongs to this application
    if (isChatEndpoint && userId) {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          applicationId: applicationId,
          isActive: true
        }
      });

      if (!user) {
        throw new UnauthorizedException('Invalid user ID or user does not belong to this application');
      }

      request.user = user;
    }

    return true;
  }
}