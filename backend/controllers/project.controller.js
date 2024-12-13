import { Project } from "../models/project.model.js";
import User from "../models/user.model.js";
import client from "../config/elasticsearch.js";

export const createProject = async (req, res) => {
  const { title, description, budget, clientId, status } = req.body;

  try {
    const user = await User.findById(clientId);
    if (!user) {
      throw "user does not exist!";
    }
    if (user.role !== "client") {
      throw "Only clients can create a project";
    }
    const newProject = new Project({
      title,
      description,
      budget,
      clientId,
      status: status || "open",
    });
    await newProject.save();
    await indexProject(newProject);
    return res.status(200).json(newProject);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found!" });
    }
    return res.status(200).json(updatedProject);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getClientProject = async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await Project.find({ clientId: id });
    return res.status(200).json(projects);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found!" });
    } else {
      return res.status(200).json(project);
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getAll = async (req, res) => {
  try {
    const allProjects = await Project.find();
    return res.status(200).json(allProjects);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};


// Elasetic Search use Below
export const indexProject = async (project) => {
  try {
    await client.index({
      index: "projects",
      id: project._id.toString(),
      body: {
        title: project.title,
        description: project.description,
        budget: project.budget,
        clientId: project.clientId.toString(),
        status: project.status,
        createdAt: project.createdAt,
      },
    });
    console.log(`Project indexed: ${project.title}`);
  } catch (error) {
    console.error("Error indexing project:", error);
  }
};

export const createIndex = async () => {
  try {
    const exists = await client.indices.exists({ index: "projects" });
    if (!exists) {
      await client.indices.create({
        index: "projects",
        body: {
          mappings: {
            properties: {
              title: { type: "text" },
              description: { type: "text" },
              budget: { type: "float" },
              clientId: { type: "keyword" },
              status: { type: "keyword" },
              createdAt: { type: "date" },
            },
          },
        },
      });
      console.log("Index created: projects");
    } else {
      console.log("Index already exists: projects");
    }
  } catch (error) {
    console.error("Error creating index:", error);
  }
};

export const searchProjects = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    const result = await client.search({
      index: "projects",
      body: {
        query: {
          multi_match: {
            query,
            fields: ["title", "description"],
          },
        },
      },
    });

    const projects = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
