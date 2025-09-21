import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { HeaderAuthGuard } from '../application/guards/header-auth.guard';

@Controller('projects')
@UseGuards(HeaderAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.create(application.id, createProjectDto, res);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.findAll(application.id, res);
  }

  @Get('by-type')
  async findByType(
    @Query('type') projectType: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.findByType(application.id, projectType, res);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.findOne(application.id, id, res);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.update(application.id, id, updateProjectDto, res);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.remove(application.id, id, res);
  }

  @Patch(':id/toggle-status')
  async toggleStatus(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.toggleStatus(application.id, id, res);
  }
}
