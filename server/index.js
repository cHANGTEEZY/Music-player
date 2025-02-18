import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import path from "path";

import { connectDB } from "./lib/db.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

//error handling middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : err.message,
    });
});

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} `);
  connectDB();
});
