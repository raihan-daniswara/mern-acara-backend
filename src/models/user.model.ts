import mongoose from "mongoose";
import type { UserEntity } from "../types/user.type";
import { hashPassword } from "../utils/hashing";

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

UserSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    // Hash the password before saving
    user.password = await hashPassword(user.password);
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

const UserModel = mongoose.model<UserEntity>("User", UserSchema);

export default UserModel;
