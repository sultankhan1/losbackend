import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class ChatRequestDto {
  @IsUUID()
  @IsNotEmpty()
  threadId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
