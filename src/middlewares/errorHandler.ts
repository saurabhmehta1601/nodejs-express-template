import { Request, Response } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export default (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    name: err.name,
    error: err.message,
  });
};
