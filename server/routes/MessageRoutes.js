import { Router } from "express";
import { addMessages, getMessages } from "../controllers/MessageController.js";

const router = Router();

router.post("/add-message",addMessages);

router.get("/get-message/:from/:to",getMessages);


export default router