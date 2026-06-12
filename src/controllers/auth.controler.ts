import type { Request, Response } from "express";
import type { UserLoginRequest, UserRegisterRequest } from "../types/user.type";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../validations/auth.validation";
import { ValidationError } from "yup";
import UserModel from "../models/user.model";
import { verifyPassword } from "../utils/hashing";

export default {
  async register(req: Request, res: Response) {
    try {
      const value: UserRegisterRequest = await userRegisterValidation.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        },
      );

      const { fullName, username, email, password } =
        value as UserRegisterRequest;

      const result = await UserModel.create({
        fullName,
        email,
        username,
        password,
      });

      return res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Success registration",
        data: result,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          status: "error",
          statusCode: 400,
          message: error.message,
          data: error.inner.map((error) => {
            return {
              path: error.path,
              message: error.message,
            };
          }),
        });
      }
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Internal server error",
        data: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      // ambil data user berdasarkan identifier (username atau email)
      const value: UserLoginRequest = await userLoginValidation.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        },
      );

      const { identifier, password } = value as UserLoginRequest;

      const findUser = await UserModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (findUser) {
        // checking password
        const isPasswordValid: boolean = await verifyPassword(
          password,
          findUser.password,
        );
        if (!isPasswordValid) {
          // Password incorrect
          return res.status(401).json({
            status: "error",
            statusCode: 401,
            message: "Invalid credentials",
            data: null,
          });
        }
        // Login successful
        return res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Login successful",
          data: findUser,
        });
      }
      // User not found
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "User not found",
        data: null,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          status: "error",
          statusCode: 400,
          message: error.message,
          data: error.inner.map((error) => {
            return {
              path: error.path,
              message: error.message,
            };
          }),
        });
      }
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Internal server error",
        data: null,
      });
    }
  },
};
