export class ApplicationResponseDto {
  id: string;
  name: string;
  description?: string;
  apiKey: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
