import { Request, Response, NextFunction } from "express";
import { getAccessToken, getRefreshToken } from "../utils/genJWT";
import User from "../models/User";
import { createOne } from "./crud";
import { ICustomError } from "../middlewares/errorHandler";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const err: ICustomError = new Error("Credentials missing");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.findOne({ username }).lean().exec();
    if (user) {
      const err: ICustomError = new Error("Username already taken");
      err.statusCode = 400;
      return next(err);
    }

    const accessToken = getAccessToken({ username });
    const refreshToken = getRefreshToken({ username });
    await createOne(User, { username, password, refreshToken });
    res.cookie("refresh-token", refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 4,
    });
    return res.status(201).json({ username, accessToken });
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }
};
