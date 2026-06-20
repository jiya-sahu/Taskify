import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/database.js";
import logger from "./utils/logger.js";
import { env } from "./config/env.js";
import errorHandler from "./middlewares/errorHandler.js";  
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(errorHandler);

const corsOptions = {
  origin:
    env.nodeEnv === "production"
      ? process.env.ALLOWED_ORIGINS?.split(",") || []
      : "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server is running",
  });
});
const PORT = env.port;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();


