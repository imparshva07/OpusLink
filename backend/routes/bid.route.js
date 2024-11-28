import express from "express";
import {
    createBid,
    getBidsByProject,
    getBidById,
    updateBid,
    deleteBid,
    approveBid
} from "../controllers/bid.controller.js";

const router = express.Router();
router.post("/", createBid);
router.get("/project/:projectId", getBidsByProject);
router.get("/:id", getBidById);
router.put("/:id", updateBid);
router.delete("/:id", deleteBid);
router.post("/:id/approve", approveBid);

export default router;
