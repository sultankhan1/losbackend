import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateThreadDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  title?: string;
}
