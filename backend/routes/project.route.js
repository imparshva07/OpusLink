import express from "express";
import * as projectFuncs from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", projectFuncs.createProject); // Create a new project
router.get("/", projectFuncs.getAll); // Fetch all projects
router.get("/search", projectFuncs.searchProjects); // Search projects
router.get("/:id", projectFuncs.getProject); // Fetch a project by ID
router.get("/client/:userId", projectFuncs.getClientProject); // Fetch projects by client userId
router.put("/:id", projectFuncs.updateProject); // Update a project

export default router;
