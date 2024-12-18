import express from "express";
import {deleteUser, updateUser, getAllFreelancers} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/freelancers", getAllFreelancers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser );


export default router;
