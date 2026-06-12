import type { Request } from "express";
import type { Types } from "mongoose";

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
  confirmPassword: string;
}

export interface UserLoginRequest {
  identifier: string;
  password: string;
}

export interface UserTokenPayload extends Omit<
  UserEntity,
  | "password"
  | "activationCode"
  | "isActive"
  | "email"
  | "fullName"
  | "profilePicture"
  | "username"
> {
  id?: Types.ObjectId;
}

export interface UserRequest extends Request {
  user?: UserTokenPayload;
}
