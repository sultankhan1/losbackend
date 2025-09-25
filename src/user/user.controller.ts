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

interface RequestWithApplication extends Request {
  user?: any;
  application?: any;
}

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HeaderAuthGuard } from '../application/guards/header-auth.guard';

@Controller('users')
@UseGuards(HeaderAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.create(req.application.id, createUserDto, res);
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.findAll(req.application.id, res);
  }

  @Get('by-email')
  async findByEmail(
    @Query('email') email: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.findByEmail(req.application.id, email, res);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.findOne(req.application.id, id, res);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.update(req.application.id, id, updateUserDto, res);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.remove(req.application.id, id, res);
  }

  @Patch(':id/toggle-status')
  async toggleStatus(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.userService.toggleStatus(req.application.id, id, res);
  }
}
