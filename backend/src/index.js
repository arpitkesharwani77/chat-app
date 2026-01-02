import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

import authRoutes from "../routes/auth.routes.js";
import messageRoutes from "../routes/message.routes.js";
import { connectDB } from "../lib/db.js";

const app = express();


//Middleware
app.use(express.json());
app.use(cookieParser());


//Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


//Server
const PORT = process.env.PORT || 5002;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
