import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

import authRoutes from "../routes/auth.routes.js";
import { connectDB } from "../lib/db.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cookieParser());


const PORT = process.env.PORT || 5002;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
