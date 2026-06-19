import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/", protectRoute, getUsersForSidebar);

export default userRoutes;
