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

interface RequestWithApplication extends Request {
  user?: any;
  application?: any;
}
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { HeaderAuthGuard } from '../application/guards/header-auth.guard';

@Controller('chat')
@UseGuards(HeaderAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  // Chat Management Endpoints
  @Post()
  async createChat(
    @Body() createChatDto: CreateChatDto,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.createChat(req.application.id, req.user.id, createChatDto, res);
  }

  @Get()
  async getChats(
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.getChats(req.application.id, req.user.id, res);
  }

  @Get(':chatId')
  async getChatById(
    @Param('chatId') chatId: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.getChatById(req.application.id, req.user.id, chatId, res);
  }

  @Patch(':chatId')
  async updateChat(
    @Param('chatId') chatId: string,
    @Body() updateChatDto: UpdateChatDto,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.updateChat(req.application.id, req.user.id, chatId, updateChatDto, res);
  }

  @Delete(':chatId')
  async deleteChat(
    @Param('chatId') chatId: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.deleteChat(req.application.id, req.user.id, chatId, res);
  }

  // Conversation Management Endpoints
  @Post(':chatId/conversations')
  async createConversation(
    @Param('chatId') chatId: string,
    @Body() createConversationDto: CreateConversationDto,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.createConversation(req.application.id, req.user.id, chatId, createConversationDto, res);
  }

  // Message Endpoints
  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() sendMessageDto: SendMessageDto,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.sendMessage(req.application.id, req.user.id, chatId, sendMessageDto, res);
  }

  @Get(':chatId/conversations/:conversationId/messages')
  async getConversationMessages(
    @Param('chatId') chatId: string,
    @Param('conversationId') conversationId: string,
    @Res() res: Response,
    @Req() req: RequestWithApplication,
  ) {
    return this.chatService.getConversationMessages(req.application.id, req.user.id, chatId, conversationId, res);
  }
}
