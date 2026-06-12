import { JWT_SECRET } from "../config/env.config";
import type { UserEntity, UserTokenPayload } from "../types/user.type";
import jwt from "jsonwebtoken";

export const generateToken = (user: UserTokenPayload) => {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

export const getUserData = (token: string) => {
  try {
    const user = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    return user;
  } catch (error) {
    return null;
  }
};
