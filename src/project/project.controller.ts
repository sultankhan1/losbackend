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

  @Post("create")
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.create(application.id, createProjectDto, res);
  }


  @Get('all')
  async findByType(
    @Res() res: Response,
    @Req() req: Request,
    @Query('type') projectType?: string,
  ) {
    const application = (req as any).application;
    return this.projectService.findByType(application.id, projectType, res);
  }

  @Get('one/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.findOne(application.id, id, res);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.update(application.id, id, updateProjectDto, res);
  }

  @Delete('delete/:id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.remove(application.id, id, res);
  }

  @Patch('toggle-status/:id')
  async toggleStatus(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const application = (req as any).application;
    return this.projectService.toggleStatus(application.id, id, res);
  }
}
