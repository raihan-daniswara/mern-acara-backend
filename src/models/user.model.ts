import mongoose from "mongoose";
import type { UserEntity } from "../types/user.type";

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserEntity>(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profilePicture: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
    activationCode: { type: String, default: "" },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<UserEntity>("User", UserSchema);

export default UserModel;
