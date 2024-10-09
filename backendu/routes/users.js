import express from "express";
import { addUser, login, profile } from "../controllers/usersController.js";
const userRouter = express.Router();

userRouter.post("/register", addUser);
userRouter.post("/login", login);
userRouter.get("/profile", profile);

export default userRouter;
