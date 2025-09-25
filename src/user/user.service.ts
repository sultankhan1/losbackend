import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../common/response/response.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService
  ) { }

  async create(applicationId: string, createUserDto: CreateUserDto, res: Response) {
    try {
      const user = await this.prisma.user.create({
        data: {
          applicationId,
          email: createUserDto.email,
          displayName: createUserDto.displayName,
          avatarUrl: createUserDto.avatarUrl,
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.responseService.success(
        'USER_CREATED',
        'User created successfully',
        user,
        res
      );
    } catch (error) {
      if (error.code === 'P2002') {
        return this.responseService.CONFLICT('USER', res);
      }
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to create user',
        error,
        res
      );
    }
  }

  async findAll(applicationId: string, res: Response) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          applicationId,
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return this.responseService.success(
        'USERS_FETCHED',
        'Users fetched successfully',
        users,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch users',
        error,
        res
      );
    }
  }

  async findOne(applicationId: string, userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          applicationId,
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return this.responseService.NOT_FOUND(
          'User not found',
          {},
          res
        );
      }

      return this.responseService.success(
        'USER_FETCHED',
        'User fetched successfully',
        user,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch user',
        error,
        res
      );
    }
  }

  async findByEmail(applicationId: string, email: string, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
          applicationId,
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return this.responseService.NOT_FOUND(
          'User not found',
          {},
          res
        );
      }

      return this.responseService.success(
        'USER_FETCHED',
        'User fetched successfully',
        user,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch user',
        error,
        res
      );
    }
  }

  async update(applicationId: string, userId: string, updateUserDto: UpdateUserDto, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          applicationId,
          isActive: true,
        },
      });

      if (!user) {
        return this.responseService.NOT_FOUND(
          'User not found',
          {},
          res
        );
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: updateUserDto,
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.responseService.success(
        'USER_UPDATED',
        'User updated successfully',
        updatedUser,
        res
      );
    } catch (error) {
      if (error.code === 'P2002') {
        return this.responseService.CONFLICT('USER', res);
      }
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to update user',
        error,
        res
      );
    }
  }

  async remove(applicationId: string, userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          applicationId,
          isActive: true,
        },
      });

      if (!user) {
        return this.responseService.NOT_FOUND(
          'User not found',
          {},
          res
        );
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.responseService.success(
        'USER_DELETED',
        'User deleted successfully',
        {},
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to delete user',
        error,
        res
      );
    }
  }

  async toggleStatus(applicationId: string, userId: string, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          applicationId,
          isActive: true,
        },
      });

      if (!user) {
        return this.responseService.NOT_FOUND(
          'User not found',
          {},
          res
        );
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { isActive: !user.isActive },
        select: {
          id: true,
          email: true,
          displayName: true,
          avatarUrl: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.responseService.success(
        'USER_STATUS_TOGGLED',
        `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`,
        updatedUser,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to toggle user status',
        error,
        res
      );
    }
  }

  // Helper method to get user by ID (for internal use)
  async getUserById(applicationId: string, userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        applicationId,
        isActive: true,
      },
    });
  }

  // Helper method to get user by email (for internal use)
  async getUserByEmail(applicationId: string, email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
        applicationId,
        isActive: true,
      },
    });
  }
}
