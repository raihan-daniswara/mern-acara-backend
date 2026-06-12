import type { Request, Response } from "express";
import type {
  UserEntity,
  UserLoginRequest,
  UserRegisterRequest,
  UserRequest,
} from "../types/user.type";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../validations/auth.validation";
import { ValidationError } from "yup";
import UserModel from "../models/user.model";
import { verifyPassword } from "../utils/hashing";
import { generateToken, getUserData } from "../utils/jwt";

export default {
  async register(req: Request, res: Response) {
    /**
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/RegisterRequest"}
      }
     */
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

      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        const errors = [];
        if (existingUser.username === username) {
          errors.push({
            path: "username",
            message: "Username already exists",
          });
        }
        if (existingUser.email === email) {
          errors.push({
            path: "email",
            message: "Email already exists",
          });
        }
        return res.status(409).json({
          status: "error",
          statusCode: 409,
          message: "User already exists",
          data: errors,
        });
      }

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
    /**
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/LoginRequest"}
      }
     */
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

      const userByIdentifier = await UserModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (userByIdentifier) {
        // checking password
        const isPasswordValid: boolean = await verifyPassword(
          password,
          userByIdentifier.password,
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

        const token = generateToken({
          id: userByIdentifier._id,
          role: userByIdentifier.role,
        });

        // Login successful
        return res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Login successful",
          data: token,
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

  async profile(req: UserRequest, res: Response) {
    /**
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
    try {
      const user = req.user;
      const result = (await UserModel.findById(user?.id)) as UserEntity;
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Success get user profile",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Internal server error",
        data: null,
      });
    }
  },
};
