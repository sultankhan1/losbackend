import { IsString, IsOptional, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}