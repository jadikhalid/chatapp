import express from "express";
import {
  login,
  logout,
  signup,
  deleteUser,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.delete("/delete/:id", deleteUser);

router.post("/logout", logout);

export default router;
