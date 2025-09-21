import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../common/response/response.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationResponseDto } from './dto/application-response.dto';
import { Response } from 'express';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService
  ) { }

  async create(createApplicationDto: CreateApplicationDto, res: Response) {
    try {
      const application = await this.prisma.application.create({
        data: {
          name: createApplicationDto.name,
          description: createApplicationDto.description,
        },
      });

      const responseData = {
        id: application.id,
        name: application.name,
        description: application.description,
        apiKey: application.apiKey,
        isActive: application.isActive,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      };

      return this.responseService.success(
        'APPLICATION_CREATED',
        'Application created successfully',
        responseData,
        res
      );
    } catch (error) {
      if (error.code === 'P2002') {
        return this.responseService.CONFLICT('APPLICATION', res);
      }
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to create application',
        error,
        res
      );
    }
  }

  async findAll(res: Response) {
    try {
      const applications = await this.prisma.application.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const responseData = applications.map(app => ({
        id: app.id,
        name: app.name,
        description: app.description,
        apiKey: app.apiKey,
        isActive: app.isActive,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt,
      }));

      return this.responseService.success(
        'APPLICATIONS_FETCHED',
        'Applications fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch applications',
        error,
        res
      );
    }
  }

  async findOne(application: any, res: Response) {
    try {
      const responseData = {
        id: application.id,
        name: application.name,
        description: application.description,
        apiKey: application.apiKey,
        isActive: application.isActive,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      };

      return this.responseService.success(
        'APPLICATION_FETCHED',
        'Application fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch application',
        error,
        res
      );
    }
  }

  async findByApiKey(apiKey: string, res: Response) {
    try {
      const application = await this.prisma.application.findUnique({
        where: { apiKey },
      });

      if (!application) {
        return this.responseService.NOT_FOUND(
          'Application not found',
          {},
          res
        );
      }

      const responseData = {
        id: application.id,
        name: application.name,
        description: application.description,
        apiKey: application.apiKey,
        isActive: application.isActive,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      };

      return this.responseService.success(
        'APPLICATION_FETCHED',
        'Application fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch application',
        error,
        res
      );
    }
  }

  async update(application: any, updateApplicationDto: UpdateApplicationDto, res: Response) {
    try {
      const updatedApplication = await this.prisma.application.update({
        where: { id: application.id },
        data: updateApplicationDto,
      });

      const responseData = {
        id: updatedApplication.id,
        name: updatedApplication.name,
        description: updatedApplication.description,
        apiKey: updatedApplication.apiKey,
        isActive: updatedApplication.isActive,
        createdAt: updatedApplication.createdAt,
        updatedAt: updatedApplication.updatedAt,
      };

      return this.responseService.success(
        'APPLICATION_UPDATED',
        'Application updated successfully',
        responseData,
        res
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return this.responseService.NOT_FOUND(
          'Application not found',
          {},
          res
        );
      }
      if (error.code === 'P2002') {
        return this.responseService.CONFLICT('APPLICATION', res);
      }
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to update application',
        error,
        res
      );
    }
  }

  async remove(application: any, res: Response) {
    try {
      await this.prisma.application.delete({
        where: { id: application.id },
      });

      return this.responseService.success(
        'APPLICATION_DELETED',
        'Application deleted successfully',
        {},
        res
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return this.responseService.NOT_FOUND(
          'Application not found',
          {},
          res
        );
      }
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to delete application',
        error,
        res
      );
    }
  }

  async toggleStatus(application: any, res: Response) {
    try {
      const updatedApplication = await this.prisma.application.update({
        where: { id: application.id },
        data: { isActive: !application.isActive },
      });

      const responseData = {
        id: updatedApplication.id,
        name: updatedApplication.name,
        description: updatedApplication.description,
        apiKey: updatedApplication.apiKey,
        isActive: updatedApplication.isActive,
        createdAt: updatedApplication.createdAt,
        updatedAt: updatedApplication.updatedAt,
      };

      return this.responseService.success(
        'APPLICATION_STATUS_TOGGLED',
        `Application ${updatedApplication.isActive ? 'activated' : 'deactivated'} successfully`,
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to toggle application status',
        error,
        res
      );
    }
  }

  async regenerateApiKey(application: any, res: Response) {
    try {
      const updatedApplication = await this.prisma.application.update({
        where: { id: application.id },
        data: { apiKey: undefined }, // This will trigger the default UUID generation
      });

      const responseData = {
        id: updatedApplication.id,
        name: updatedApplication.name,
        description: updatedApplication.description,
        apiKey: updatedApplication.apiKey,
        isActive: updatedApplication.isActive,
        createdAt: updatedApplication.createdAt,
        updatedAt: updatedApplication.updatedAt,
      };

      return this.responseService.success(
        'APPLICATION_API_KEY_REGENERATED',
        'Application API key regenerated successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to regenerate API key',
        error,
        res
      );
    }
  }
}
