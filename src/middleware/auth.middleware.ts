import type { NextFunction, Request, Response } from "express";
import type { UserRequest, UserTokenPayload } from "../types/user.type";
import { getUserData } from "../utils/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return res.status(403).json({
      status: "error",
      statusCode: 403,
      message: "Unauthorized",
      data: null,
    });
  }

  const [prefix, token] = authorization.split(" ");
  if (!(prefix === "Bearer" && token)) {
    return res.status(403).json({
      status: "error",
      statusCode: 403,
      message: "Unauthorized",
      data: null,
    });
  }

  const user = getUserData(token);

  if (!user) {
    return res.status(403).json({
      status: "error",
      statusCode: 403,
      message: "Unauthorized",
      data: null,
    });
  }

  (req as UserRequest).user = user;
  next();
};
