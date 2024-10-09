import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController.js";

const itemsRouter = express.Router();

itemsRouter.get("/", verifyToken, getAllItems);
itemsRouter.post("/", verifyToken, createItem);
itemsRouter.put("/:id", verifyToken, updateItem);
itemsRouter.delete("/:id", verifyToken, deleteItem);

export default itemsRouter;
