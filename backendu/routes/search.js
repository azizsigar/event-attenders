import express from 'express';
import { searchItems } from '../controllers/searchController.js';

const searchRouter = express.Router();

// Define your routes here
searchRouter.get("/", searchItems);

export default searchRouter;
