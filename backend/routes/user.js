import express from "express";
import {deleteUser, getUser} from "../controllers/user.js";

const router = express.Router();

router.delete("/:id", deleteUser );
router.get("/:uid", getUser );

export default router;
