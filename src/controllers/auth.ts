import { Request, Response } from "express";
import genJWT from "../utils/genJWT";
import User from "../models/User";
import { createOne } from "./crud";

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).end();
    }
    const accessToken = genJWT({ email });
    await createOne(User, { email, password });
    return res.status(201).json({ accessToken });
  } catch (error) {
    return res.status(401).end();
  }
};
