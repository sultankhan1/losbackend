import { IsString, IsOptional } from 'class-validator';

export class UpdateThreadDto {
  @IsString()
  @IsOptional()
  title?: string;
}
