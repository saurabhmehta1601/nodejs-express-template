import express, { Request, Response } from "express";
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
  res.end();
});

app.listen(PORT, () => {
  console.log(`> Express api running on port ${PORT}`);
});
