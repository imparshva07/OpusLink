import { Project } from "../models/project.model.js";
import User from "../models/user.model.js";
import client from "../config/elasticsearch.js";

export const createProject = async (req, res) => {
  const {
    userId,
    title,
    description,
    category,
    budget,
    img,
    expected_delivery_time,
    specifications,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw "User does not exist!";
    }
    if (!user.isClient) {
      throw "Only clients can create a project";
    }

    const newProject = new Project({
      userId,
      title,
      description,
      category,
      budget,
      img,
      expected_delivery_time,
      specifications,
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
  const { userId } = req.params;

  try {
    const projects = await Project.find({ userId });
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
    }

    return res.status(200).json(project);
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

// Elasticsearch functions
export const indexProject = async (project) => {
  try {
    await client.index({
      index: "projects",
      id: project._id.toString(),
      body: {
        userId: project.userId.toString(),
        title: project.title,
        description: project.description,
        category: project.category,
        budget: project.budget,
        img: project.img,
        expected_delivery_time: project.expected_delivery_time,
        specifications: project.specifications,
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
              userId: { type: "keyword" },
              title: { type: "text" },
              description: { type: "text" },
              category: { type: "keyword" },
              budget: { type: "float" },
              img: { type: "text" },
              expected_delivery_time: { type: "date" },
              specifications: { type: "text" },
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
            fields: ["title", "description", "category", "specifications"],
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
