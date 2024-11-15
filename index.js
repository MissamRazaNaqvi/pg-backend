import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoAtlas from "./src/config/databaseConnection.js";
import route from "./src/routes/studentRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));
app.use(express.json());

// Connect to MongoDB
connectMongoAtlas();
app.use("/", route);

// Server start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
