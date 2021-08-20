import { Request, Response } from "express";
import { accessToken } from "../utils/genJWT";
import User from "../models/User";
import { createOne } from "./crud";

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).end();
    }
    const token = accessToken({ username });
    await createOne(User, { username, password });
    return res.status(201).json({ accessToken: token });
  } catch (error) {
    return res.status(401).end();
  }
};
