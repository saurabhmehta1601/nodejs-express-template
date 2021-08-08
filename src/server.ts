import { config } from "dotenv";
import connectDb from "./utils/connectDb";
import express from "express";
import morgan from "morgan";
import { Error } from "mongoose";
import apiRoutes from "./routes/api";
import authMiddleware from "./middlewares/auth"
import authRoutes from "./routes/auth"

config();
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRoutes)
app.use("/api", authMiddleware, apiRoutes);



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
