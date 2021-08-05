import { config } from "dotenv";
import connectDb from "./utils/connectDb";
import express from "express";
import { Error } from "mongoose";
config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  // app.use(errorHandler)
}

app.get("/", (_req, res) => {
  throw new Error("som error");
  res.send(`hello `);
});

connectDb()
  .then(() => {
    console.info(`> MongoDB connection successfull.`);

    app.listen(PORT, () => {
      console.info(`> Express api running on port ${PORT}`);
    });
  })
  .catch((e: Error) => {
    console.error("MongoError name => ", e.name);
    console.error("MongoError message => ", e.message);
  });
