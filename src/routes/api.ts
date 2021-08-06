import express, { Response } from "express";
const router = express.Router();

router.get("/", (_req, res: Response) => {
  return res.send("hello from api");
});

export default router;
