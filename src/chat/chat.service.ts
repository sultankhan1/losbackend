import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseService } from '../common/response/response.service';
import { ProjectService } from '../project/project.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Response } from 'express';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
    private projectService: ProjectService,
  ) { }

  // Chat Management
  async createChat(applicationId: string, userId: string, createChatDto: CreateChatDto, res: Response) {
    try {
      // Verify project exists and belongs to application
      const project = await this.prisma.project.findFirst({
        where: {
          id: createChatDto.projectId,
          applicationId,
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          projectType: true,
          openaiApiKey: true,
        },
      });

      if (!project) {
        return this.responseService.NOT_FOUND(
          'Project not found or inactive',
          {},
          res
        );
      }

      if (!project.openaiApiKey) {
        return this.responseService.BAD_REQUEST(
          'Project does not have a valid OpenAI API key',
          res
        );
      }

      const chat = await this.prisma.chat.create({
        data: {
          applicationId,
          userId,
          projectId: createChatDto.projectId,
          title: createChatDto.title,
          description: createChatDto.description,
        },
      });

      const responseData = {
        id: chat.id,
        title: chat.title,
        description: chat.description,
        projectId: chat.projectId,
        project: {
          id: project.id,
          name: project.name,
          projectType: project.projectType,
        },
        isActive: chat.isActive,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      };

      return this.responseService.success(
        'CHAT_CREATED',
        'Chat created successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to create chat',
        error,
        res
      );
    }
  }

  async getChats(applicationId: string, userId: string, res: Response) {
    try {
      const chats = await this.prisma.chat.findMany({
        where: {
          applicationId,
          userId,
          isActive: true,
        },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              projectType: true,
            },
          },
          conversations: {
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            take: 1, // Get latest conversation for preview
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      const responseData = chats.map(chat => ({
        id: chat.id,
        title: chat.title,
        description: chat.description,
        projectId: chat.projectId,
        project: {
          id: chat.project.id,
          name: chat.project.name,
          projectType: chat.project.projectType,
        },
        isActive: chat.isActive,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        lastConversation: chat.conversations[0] || null,
      }));

      return this.responseService.success(
        'CHATS_FETCHED',
        'Chats fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch chats',
        error,
        res
      );
    }
  }

  async getChatById(applicationId: string, userId: string, chatId: string, res: Response) {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: {
          id: chatId,
          applicationId,
          userId,
          isActive: true,
        },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              projectType: true,
            },
          },
          conversations: {
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
          },
        },
      });

      if (!chat) {
        return this.responseService.NOT_FOUND(
          'Chat not found',
          {},
          res
        );
      }

      const responseData = {
        id: chat.id,
        title: chat.title,
        description: chat.description,
        projectId: chat.projectId,
        project: {
          id: chat.project.id,
          name: chat.project.name,
          projectType: chat.project.projectType,
        },
        isActive: chat.isActive,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        conversations: chat.conversations,
      };

      return this.responseService.success(
        'CHAT_FETCHED',
        'Chat fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch chat',
        error,
        res
      );
    }
  }

  async updateChat(applicationId: string, userId: string, chatId: string, updateChatDto: UpdateChatDto, res: Response) {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: {
          id: chatId,
          applicationId,
          userId,
          isActive: true,
        },
      });

      if (!chat) {
        return this.responseService.NOT_FOUND(
          'Chat not found',
          {},
          res
        );
      }

      const updatedChat = await this.prisma.chat.update({
        where: { id: chatId },
        data: updateChatDto,
      });

      const responseData = {
        id: updatedChat.id,
        title: updatedChat.title,
        description: updatedChat.description,
        isActive: updatedChat.isActive,
        createdAt: updatedChat.createdAt,
        updatedAt: updatedChat.updatedAt,
      };

      return this.responseService.success(
        'CHAT_UPDATED',
        'Chat updated successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to update chat',
        error,
        res
      );
    }
  }

  async deleteChat(applicationId: string, userId: string, chatId: string, res: Response) {
    try {
      const chat = await this.prisma.chat.findFirst({
        where: {
          id: chatId,
          applicationId,
          userId,
          isActive: true,
        },
      });

      if (!chat) {
        return this.responseService.NOT_FOUND(
          'Chat not found',
          {},
          res
        );
      }

      await this.prisma.chat.update({
        where: { id: chatId },
        data: { isActive: false },
      });

      return this.responseService.success(
        'CHAT_DELETED',
        'Chat deleted successfully',
        {},
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to delete chat',
        error,
        res
      );
    }
  }

  // Conversation Management
  async createConversation(applicationId: string, userId: string, chatId: string, createConversationDto: CreateConversationDto, res: Response) {
    try {
      // Verify chat belongs to user
      const chat = await this.prisma.chat.findFirst({
        where: {
          id: chatId,
          applicationId,
          userId,
          isActive: true,
        },
      });

      if (!chat) {
        return this.responseService.NOT_FOUND(
          'Chat not found',
          {},
          res
        );
      }

      // Generate a new OpenAI thread ID (UUID format)
      const threadId = this.generateThreadId();

      const conversation = await this.prisma.conversation.create({
        data: {
          chatId,
          threadId,
          title: createConversationDto.title,
        },
      });

      const responseData = {
        id: conversation.id,
        chatId: conversation.chatId,
        threadId: conversation.threadId,
        title: conversation.title,
        isActive: conversation.isActive,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      };

      return this.responseService.success(
        'CONVERSATION_CREATED',
        'Conversation created successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to create conversation',
        error,
        res
      );
    }
  }

  // Message Management with OpenAI Integration
  async sendMessage(applicationId: string, userId: string, chatId: string, sendMessageDto: SendMessageDto, res: Response) {
    try {
      // Verify chat belongs to user and get project info
      const chat = await this.prisma.chat.findFirst({
        where: {
          id: chatId,
          applicationId,
          userId,
          isActive: true,
        },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              projectType: true,
              openaiApiKey: true,
              isActive: true,
            },
          },
        },
      });

      if (!chat) {
        return this.responseService.NOT_FOUND(
          'Chat not found',
          {},
          res
        );
      }

      if (!chat.project || !chat.project.isActive) {
        return this.responseService.NOT_FOUND(
          'Project not found or inactive',
          {},
          res
        );
      }

      if (!chat.project.openaiApiKey) {
        return this.responseService.BAD_REQUEST(
          'Project does not have a valid OpenAI API key',
          res
        );
      }

      // Always use the project assigned to this chat
      const project = chat.project;

      let conversation;

      if (sendMessageDto.conversationId) {
        // Use existing conversation
        conversation = await this.prisma.conversation.findFirst({
          where: {
            id: sendMessageDto.conversationId,
            chatId,
            isActive: true,
          },
        });

        if (!conversation) {
          return this.responseService.NOT_FOUND(
            'Conversation not found',
            {},
            res
          );
        }
      } else {
        // Create new conversation
        const threadId = this.generateThreadId();
        conversation = await this.prisma.conversation.create({
          data: {
            chatId,
            threadId,
            title: 'New Conversation',
          },
        });
      }

      // Save user message
      const userMessage = await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: 'user',
          content: sendMessageDto.content,
        },
      });

      // Get conversation history for context
      const messages = await this.prisma.message.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: 'asc' },
        take: 20, // Limit context to last 20 messages
      });

      // Prepare messages for OpenAI
      const openaiMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add system message based on the chat's project type
      const systemMessage = {
        role: 'system',
        content: this.getSystemMessage(project.projectType)
      };

      const chatMessages = [systemMessage, ...openaiMessages];

      // Call OpenAI API with project-specific API key
      const aiResponse = await this.callOpenAI(chatMessages, project.openaiApiKey);

      // Save AI response
      const assistantMessage = await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: 'assistant',
          content: aiResponse,
          metadata: {
            model: 'gpt-4o-mini',
            timestamp: new Date().toISOString(),
          },
        },
      });

      const responseData = {
        conversation: {
          id: conversation.id,
          threadId: conversation.threadId,
          title: conversation.title,
        },
        messages: [
          {
            id: userMessage.id,
            role: userMessage.role,
            content: userMessage.content,
            createdAt: userMessage.createdAt,
          },
          {
            id: assistantMessage.id,
            role: assistantMessage.role,
            content: assistantMessage.content,
            createdAt: assistantMessage.createdAt,
          },
        ],
      };

      return this.responseService.success(
        'MESSAGE_SENT',
        'Message sent and AI response received',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to send message',
        error,
        res
      );
    }
  }

  async getConversationMessages(applicationId: string, userId: string, chatId: string, conversationId: string, res: Response) {
    try {
      // Verify conversation belongs to user's chat
      const conversation = await this.prisma.conversation.findFirst({
        where: {
          id: conversationId,
          chatId,
          chat: {
            applicationId,
            userId,
            isActive: true,
          },
          isActive: true,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      if (!conversation) {
        return this.responseService.NOT_FOUND(
          'Conversation not found',
          {},
          res
        );
      }

      const responseData = {
        id: conversation.id,
        chatId: conversation.chatId,
        threadId: conversation.threadId,
        title: conversation.title,
        isActive: conversation.isActive,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        messages: conversation.messages.map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          metadata: msg.metadata,
          createdAt: msg.createdAt,
        })),
      };

      return this.responseService.success(
        'CONVERSATION_MESSAGES_FETCHED',
        'Conversation messages fetched successfully',
        responseData,
        res
      );
    } catch (error) {
      return this.responseService.INTERNAL_SERVER_ERROR(
        'Failed to fetch conversation messages',
        error,
        res
      );
    }
  }

  // Private helper methods
  private generateThreadId(): string {
    return 'thread_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  private getSystemMessage(projectType: string): string {
    const systemMessages = {
      'general': 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses. Use markdown formatting when appropriate for better readability.',
      'coding': 'You are an expert software developer and coding assistant. Help with programming questions, code reviews, debugging, and best practices. Provide clean, well-documented code examples.',
      'writing': 'You are a professional writing assistant. Help with content creation, editing, proofreading, and improving writing quality. Focus on clarity, structure, and engaging content.',
      'analysis': 'You are a data analysis expert. Help with data interpretation, statistical analysis, and providing insights from data. Use clear explanations and visual descriptions when appropriate.',
      'default': 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses. Use markdown formatting when appropriate for better readability.'
    };

    return systemMessages[projectType] || systemMessages['default'];
  }

  private async callOpenAI(messages: any[], apiKey: string): Promise<string> {
    try {
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      console.log(completion);

      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`Failed to call OpenAI API: ${error.message}`);
    }
  }
}
