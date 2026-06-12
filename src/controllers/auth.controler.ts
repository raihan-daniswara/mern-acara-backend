import type { Request, Response } from "express";
import type { UserRegisterRequest } from "../types/user.type";
import { userRegisterValidation } from "../validations/auth.validation";
import { ValidationError } from "yup";
import UserModel from "../models/user.model";

export default {
  async register(req: Request, res: Response) {
    try {
      const value = await userRegisterValidation.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      const { fullName, username, email, password, confirmPassword } =
        value as UserRegisterRequest;

      const result = await UserModel.create({
        fullName,
        email,
        username,
        password,
      })

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
};
