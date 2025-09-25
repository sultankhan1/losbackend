export class ProjectResponseDto {
  id: string;
  name: string;
  description?: string;
  projectType: string;
  openaiProjectId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Note: openaiApiKey is not included in response for security
}
