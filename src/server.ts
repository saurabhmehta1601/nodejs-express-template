import { config } from "dotenv";
import connectDb from "./utils/connectDb";
import express from "express";
import morgan from "morgan";
import { Error } from "mongoose";
import apiRoutes from "./routes/api";

config();
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

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
