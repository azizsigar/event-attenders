import express from "express";
import usersRouter from "./routes/users.js";
import itemsRouter from "./routes/items.js";
import searchRouter from "./routes/search.js";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/search", searchRouter);
export default app;
