import { Router } from "express";
import { addMessages } from "../controllers/MessageController.js";

const router = Router();

router.post("/add-message",addMessages);

export default router