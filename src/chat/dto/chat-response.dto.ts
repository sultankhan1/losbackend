export class ChatResponseDto {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ConversationResponseDto {
  id: string;
  chatId: string;
  threadId: string;
  title?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class MessageResponseDto {
  id: string;
  conversationId: string;
  role: string;
  content: string;
  metadata?: any;
  createdAt: Date;
}

export class ChatWithConversationsResponseDto extends ChatResponseDto {
  conversations: ConversationResponseDto[];
}

export class ConversationWithMessagesResponseDto extends ConversationResponseDto {
  messages: MessageResponseDto[];
}
