import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith("Bearer ")) {
    const token = authToken.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!user) {
      return res.status(401).end();
    }
    next();
  } else {
    return res.status(401).end();
  }
};
