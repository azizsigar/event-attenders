import express from "express";
import { addUser, getUserProfile, login } from "../controllers/usersController.js";
import verifyToken from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", addUser);
userRouter.post("/login", login);
userRouter.get("/profile", verifyToken, getUserProfile);
export default userRouter;
