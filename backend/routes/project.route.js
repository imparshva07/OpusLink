import express from "express";
import * as projectFuncs from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", projectFuncs.createProject);
router.get("/", projectFuncs.getAll);
router.get("/:id", projectFuncs.getProject);
router.get("/client/:id", projectFuncs.getClientProject);
router.put("/:id", projectFuncs.updateProject);

export default router;