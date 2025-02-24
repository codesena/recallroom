import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_USER_KEY = "senate";
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  try {
    const decoded = jwt.verify(header as string, JWT_USER_KEY);
    if (decoded) {
      //req.body.userId is used only when:
      //The userId is intentionally sent by the client as part of the request payload (e.g., when updating another user's data, such as an admin managing users).
      //@ts-ignore
      req.userId = decoded.id;
      //Using req.userId keeps user-related information (like authentication/authorization) separate from the request payload (req.body), which typically contains data the user explicitly sends, such as form inputs or JSON objects.
      next();
    }
  } catch (e: any) {
    if (e.message == "invalid signature") {
      res.json({
        msg: e.message,
      });
    } else {
      res.status(403).json({
        msg: "You are not logged in",
      });
    }
  }
};
