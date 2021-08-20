import { config } from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import apiRoutes from "./routes/api";
import authMiddleware from "./middlewares/auth";
import authRoutes from "./routes/auth";
import errorHandler from "./middlewares/errorHandler";

config();
const app: Express = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth", authRoutes);
app.use("/api", authMiddleware, apiRoutes);

app.use(errorHandler); // always put errorHandler at end

export default app;
