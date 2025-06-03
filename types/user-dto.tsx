export interface LoginResponseDto {
  user: UserResponseDto;
  featureKeys: string[];
  roleNames: string[];
  accessLevelRole: String;
}

export interface UserResponseDto {
  id: number;
  login: string;
  userName: string;
  email: string;
  mobileNumber: string;
  fullName: string;
  avatarUrl: string;
  googleId: string;
  githubId: string;
  emailId: string;
}
