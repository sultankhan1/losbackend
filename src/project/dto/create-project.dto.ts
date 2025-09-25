import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  projectType: string; // e.g., 'general', 'coding', 'writing', 'analysis', etc.

  @IsString()
  @IsNotEmpty()
  openaiApiKey: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  openaiProjectId: string;
}
