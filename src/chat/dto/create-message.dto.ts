import { IsString, IsUUID, IsNotEmpty, IsIn } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  @IsNotEmpty()
  threadId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';
}
