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
      err.statusCode = 401;
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
    return res.status(201).json({ data: { username, accessToken } });
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }
};

export const login = async (
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

    const user = await User.findOne({ username })

    if (!user) {
      const err: ICustomError = new Error("Please check credentials");
      err.statusCode = 400;
      return next(err);
    }

    user.comparePassword(password, async (err, isMatch: boolean) => {
      if (err) {
        return next(err);
      } else {
        if (isMatch) {
          const refreshToken = getRefreshToken({ username });
          const accessToken = getAccessToken({ username });

          user.refreshToken = refreshToken
          await user.save()

          res.cookie("refresh-token", refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30 * 4,
          });
          return res.status(200).json({ data: { accessToken } });
        } else {
          const err: ICustomError = new Error("Please check credentials");
          err.statusCode = 400;
          return next(err);
        }
      }
    });
  } catch (err) {
    return next(err);
  }
};
