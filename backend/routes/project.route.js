import express from "express";
import * as projectFuncs from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", projectFuncs.createProject); 
router.get("/", projectFuncs.getAll); 
router.get("/search", projectFuncs.searchProjects); 
router.get("/search/:userId", projectFuncs.searchProjectsByUserId); 
router.get("/:id", projectFuncs.getProject); 
router.get("/client/:userId", projectFuncs.getClientProject); 
router.put("/:id", projectFuncs.updateProject); 
router.delete("/:id", projectFuncs.deleteProject);

export default router;
