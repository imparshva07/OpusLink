import express from "express";
import {register, login, getUser} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getUser", getUser);

export default router;
