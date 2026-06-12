export type UserRole = "user" | "admin";

export interface UserEntity {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

export interface UserRegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}