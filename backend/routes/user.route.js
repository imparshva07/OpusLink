import express from "express";
import { getUser, updateUser, getAll } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getUser);
router.put("/:id", updateUser);

export default router;