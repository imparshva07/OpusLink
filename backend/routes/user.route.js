import express from "express";
import {deleteUser, updateUser} from "../controllers/user.controller.js";

const router = express.Router();

router.put("/:id", updateUser);
router.delete("/:id", deleteUser );

export default router;
