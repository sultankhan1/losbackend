import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  conversationId?: string; // If not provided, will create a new conversation

  @IsString()
  @IsOptional()
  projectType?: string; // Optional: specify project type for dynamic project selection
}
