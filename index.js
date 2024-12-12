import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

import connectMongoAtlas from "./src/config/databaseConnection.js";
import { setupCronJobs } from "./src/cron.js";
import { initializeRoutes } from "./src/routes/index.js";
import { loggerMiddleware } from "./src/middlewares/loggerMiddleware.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 3001;

// Initialize Middlewares
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
  })
);
app.use(compression());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(loggerMiddleware);

// Connect to MongoDB
connectMongoAtlas();

// Initialize Routes
// initializeRoutes(app);

// Health Check Route
// app.get("/health", (req, res) => {
//   res.status(200).json({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//   });
// });

// Error Handling Middleware
app.use(errorHandler);

// Setup Cron Jobs
setupCronJobs();

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
