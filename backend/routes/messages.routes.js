import express from "express";
import {
  sendMessage,
  getMessage,
} from "../controllers/messages.controllers.js";
import protectRoute from "../middleware/auth.middleware.js";

const messageRoutes = express.Router();

messageRoutes.get("/:id", protectRoute, getMessage);
messageRoutes.post("/send/:receiverId", protectRoute, sendMessage);

export default messageRoutes;
