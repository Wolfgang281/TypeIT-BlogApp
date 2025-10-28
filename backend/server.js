import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { connectDB } from "./src/config/database.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

import { seedAdmin } from "./src/seed/admin.seed.js";

import authAdminRoutes from "./src/routes/admin/auth.route.js";
import blogAdminRoutes from "./src/routes/admin/blog.routes.js";
import commentAdminRoutes from "./src/routes/admin/comment.route.js";
import blogUserRoutes from "./src/routes/user/blog.routes.js";
import commentUserRoutes from "./src/routes/user/comment.routes.js";

connectDB();

if (process.argv[2] === "seed") {
  seedAdmin();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://typeit-blogapp-frontend.onrender.com",
  })
);

app.use("/api/admin/auth", authAdminRoutes);
app.use("/api/admin/blog", blogAdminRoutes);
app.use("/api/user/blog", blogUserRoutes);
app.use("/api/admin/comment", commentAdminRoutes);
app.use("/api/user/comment", commentUserRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server is running on port 9000");
});
