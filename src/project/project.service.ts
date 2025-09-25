import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../common/response/response.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Response } from 'express';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService
  ) { }

  async create(applicationId: string, createProjectDto: CreateProjectDto, res: Response) {
    try {
      const project = await this.prisma.project.create({
        data: {
          applicationId,
          name: createProjectDto.name,
          description: createProjectDto.description,
          projectType: createProjectDto.projectType,
          openaiApiKey: createProjectDto.openaiApiKey,
          openaiProjectId: createProjectDto.openaiProjectId,
        },
      });

      const responseData = {
        id: project.id,
        name: project.name,
        description: project.description,
        projectType: project.projectType,
        openaiProjectId: project.openaiProjectId,
        isActive: project.isActive,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      };

      return this.responseService.success(
        'PROJECT_CREATED',
        'Project created successfully',
        responseData,
        res
      );
    } catch (error) {
      if (error.code === 'P2002') {
        return this.responseService.CONFLICT('PROJECT', res);
      }
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to create project',
        error,
        res
      );
    }
  }

  async findOne(applicationId: string, projectId: string, res: Response) {
    try {
      const project = await this.prisma.project.findFirst({
        where: {
          id: projectId,
          applicationId,
          isActive: true,
        },
        select:{
          id: true,
          name: true,
          description: true,
          projectType: true,
          openaiProjectId: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!project) {
        return this.responseService.NOT_FOUND(
          'Project not found',
          {},
          res
        );
      }

      const responseData = project;

      return this.responseService.success(
        'PROJECT_FETCHED',
        'Project fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch project',
        error,
        res
      );
    }
  }

  async findByType(applicationId: string, projectType: string | undefined, res: Response) {
    try {
      // Build where clause conditionally
      const whereClause: any = {
        applicationId,
        isActive: true,
      };

      // Only add projectType filter if it's provided
      if (projectType) {
        whereClause.projectType = projectType;
      }

      const projects = await this.prisma.project.findMany({
        where: whereClause,
        select:{
          id: true,
          name: true,
          description: true,
          projectType: true,
          openaiProjectId: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const responseData = projects;

      const message = projectType 
        ? `Projects of type '${projectType}' fetched successfully`
        : 'All projects fetched successfully';

      return this.responseService.success(
        'PROJECTS_FETCHED',
        message,
        responseData,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch projects',
        error,
        res
      );
    }
  }

  async update(applicationId: string, projectId: string, updateProjectDto: UpdateProjectDto, res: Response) {
    try {
      const project = await this.prisma.project.findFirst({
        where: {
          id: projectId,
          applicationId,
          isActive: true,
        },
        select:{
          id: true,
          name: true,
          description: true,
          projectType: true,
          openaiProjectId: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!project) {
        return this.responseService.NOT_FOUND(
          'Project not found',
          {},
          res
        );
      }

      const updatedProject = await this.prisma.project.update({
        where: { id: projectId },
        data: updateProjectDto,
        select:{
          id: true,
          name: true,
          description: true,
          projectType: true,
          openaiProjectId: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const responseData = updatedProject;

      return this.responseService.success(
        'PROJECT_UPDATED',
        'Project updated successfully',
        responseData,
        res
      );
    } catch (error) {
      if (error.code === 'P2025') {
        return this.responseService.NOT_FOUND(
          'Project not found',
          {},
          res
        );
      }
      if (error.code === 'P2002') {
        return this.responseService.CONFLICT('PROJECT', res);
      }
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to update project',
        error,
        res
      );
    }
  }

  async remove(applicationId: string, projectId: string, res: Response) {
    try {
      const project = await this.prisma.project.findFirst({
        where: {
          id: projectId,
          applicationId,
          isActive: true,
        },
        select:{
          id: true,
          name: true,
          description: true,
          projectType: true,
          openaiProjectId: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!project) {
        return this.responseService.NOT_FOUND(
          'Project not found',
          {},
          res
        );
      }

      await this.prisma.project.update({
        where: { id: projectId },
        data: { isActive: false },
        select:{
          id: true,
          name: true,
          description: true,
          projectType: true,
          openaiProjectId: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const responseData = project;

      return this.responseService.success(
        'PROJECT_DELETED',
        'Project deleted successfully',
        responseData,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to delete project',
        error,
        res
      );
    }
  }

  async toggleStatus(applicationId: string, projectId: string, res: Response) {
    try {
      const project = await this.prisma.project.findFirst({
        where: {
          id: projectId,
          applicationId,
        },
      });

      if (!project) {
        return this.responseService.NOT_FOUND(
          'Project not found',
          {},
          res
        );
      }

      const updatedProject = await this.prisma.project.update({
        where: { id: projectId },
        data: { isActive: !project.isActive },
      });

      const responseData = {
        id: updatedProject.id,
        name: updatedProject.name,
        description: updatedProject.description,
        projectType: updatedProject.projectType,
        isActive: updatedProject.isActive,
        createdAt: updatedProject.createdAt,
        updatedAt: updatedProject.updatedAt,
      };

      return this.responseService.success(
        'PROJECT_STATUS_TOGGLED',
        `Project ${updatedProject.isActive ? 'activated' : 'deactivated'} successfully`,
        responseData,
        res
      );
    } catch (error) {
      console.log(error);
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to toggle project status',
        error,
        res
      );
    }
  }

  // Helper method to get project by type for chat service
  async getProjectByType(applicationId: string, projectType: string) {
    return this.prisma.project.findFirst({
      where: {
        applicationId,
        projectType,
        isActive: true,
      },
    });
  }

  // Helper method to get project API key
  async getProjectApiKey(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { openaiApiKey: true, projectType: true, name: true },
    });
    return project;
  }
}
