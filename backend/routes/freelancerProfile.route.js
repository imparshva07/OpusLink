import { updateProfile, getUserProfile, getAllProfiles } from "../controllers/freelancerProfile.controller.js"
import express from "express";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:id", getUserProfile);
router.put("/:id", updateProfile);

export default router;