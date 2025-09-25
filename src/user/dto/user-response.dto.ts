export class UserResponseDto {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
