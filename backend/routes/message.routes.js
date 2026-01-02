import express from "express"
import { protectRoute } from "../Middleware/auth.middleware"
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";

const router=express.Router()

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.get("/send/:id", protectRoute, sendMessage);


export default router