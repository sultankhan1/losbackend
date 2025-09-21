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
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { HeaderAuthGuard } from './guards/header-auth.guard';

interface RequestWithApplication extends Request {
  user?: any;
}

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @Post("create")
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
    @Res() res: Response,
  ) {
    return this.applicationService.create(createApplicationDto, res);
  }

  @Get("only/applications")
  @UseGuards(HeaderAuthGuard)
  async findAll(@Res() res: Response) {
    return this.applicationService.findAll(res);
  }

  @Get('me')
  @UseGuards(HeaderAuthGuard)
  async findOne(@Req() req: RequestWithApplication, @Res() res: Response) {
    return this.applicationService.findOne(req.user, res);
  }

  @Patch('me')
  @UseGuards(HeaderAuthGuard)
  async update(
    @Req() req: RequestWithApplication,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Res() res: Response,
  ) {
    return this.applicationService.update(req.user, updateApplicationDto, res);
  }

  @Delete('me')
  @UseGuards(HeaderAuthGuard)
  async remove(@Req() req: RequestWithApplication, @Res() res: Response) {
    return this.applicationService.remove(req.user, res);
  }

  @Patch('me/toggle-status')
  @UseGuards(HeaderAuthGuard)
  async toggleStatus(@Req() req: RequestWithApplication, @Res() res: Response) {
    return this.applicationService.toggleStatus(req.user, res);
  }

  @Patch('me/regenerate-api-key')
  @UseGuards(HeaderAuthGuard)
  async regenerateApiKey(@Req() req: RequestWithApplication, @Res() res: Response) {
    return this.applicationService.regenerateApiKey(req.user, res);
  }
}
