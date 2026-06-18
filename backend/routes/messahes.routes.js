import express from "express";
import { sendMessage } from "../controllers/message.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const messageRoutes = express.Router();

messageRoutes.post("/send/:receiverId", protectRoute, sendMessage);

export default messageRoutes;
