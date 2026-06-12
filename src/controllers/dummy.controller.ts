import type { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "success hit endpoint /api/dummy",
      data: "OK",
    });
  },
};
