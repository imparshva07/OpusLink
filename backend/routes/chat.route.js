import express from "express";
const router = express.Router();
import {initiateChat,sendMessage,getMessages,getUserChats,deleteChat} from "../controllers/chat.controller.js";


router.post('/initiate', initiateChat);
router.post('/send', sendMessage);
router.get('/:chatId/messages', getMessages);
router.get("/:id", getUserChats);
router.delete("/delete/:chatId", deleteChat);
export default router;