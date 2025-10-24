import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { connectDB } from "./src/config/database.js";

import { seedAdmin } from "./src/seed/admin.seed.js";
import authRoutes from "./src/routes/auth.route.js";
import blogRoutes from "./src/routes/blog.routes.js";
import { authenticate, authorize } from "./src/middlewares/auth.middleware.js";

connectDB();

if (process.argv[2] === "seed") {
  seedAdmin();
}

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server is running on port 9000");
});
