import {Project} from "../models/project.model.js"
import {User} from "../models/user.model.js"

export const createProject = async (req, res) => {
    const { title, description, budget, clientId, status } = req.body

    try {
        const user = await User.findById(clientId)
        if (!user) {
            throw "user does not exist!"
        }
        if (user.role !== 'client'){
            throw 'Only clients can create a project';
        }
        const newProject = new Project({
            title,
            description,
            budget,
            clientId,
            status: (status || "open")
        })
        await newProject.save();
        return res.status(200).json(newProject)
    } catch (e) {
        return res.status(500).json({ error: e })
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found!" });
        }
        return res.status(200).json(updatedProject)
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export const getClientProject = async (req, res) => {
    const { id } = req.params
    try {
        const projects = await Project.find({ clientId: id })
        return res.status(200).json(projects)
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export const getProject = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ error: "Project not found!" });
        }
        else {
            return res.status(200).json(project)
        }
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export const getAll = async (req, res) => {
    try {
        const allProjects = await Project.find();
        return res.status(200).json(allProjects)
    } catch (e) {
        return res.status(500).json({ error: e });
    }
} 