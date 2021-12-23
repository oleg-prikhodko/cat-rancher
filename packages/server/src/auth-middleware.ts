import { RequestHandler } from "express";
import { getUserById } from "./auth-service";

export const authMiddleware: RequestHandler = (req, res, next) => {
  if (req.session.userId && getUserById(req.session.userId)) {
    next();
  } else {
    res.status(401).end();
  }
};
