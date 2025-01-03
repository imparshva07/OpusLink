import { Project } from "../models/project.model.js";
import User from "../models/user.model.js";
import client from "../config/elasticsearch.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import redis from "redis";

const redisclient = redis.createClient();
redisclient.connect().then(() => {});
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
    const user = await User.findById(new mongoose.Types.ObjectId(userId));

    if (!user) {
      throw new Error("User does not exist!");
    }

    if (!user.isClient) {
      throw new Error("Only clients are authorized to create a project.");
    }

    if (!Array.isArray(specifications) || specifications.length === 0) {
      throw new Error(
        "Specifications must be an array with at least one item."
      );
    }

    const invalidSpecs = specifications.filter((spec) => spec.length < 3);
    if (invalidSpecs.length > 0) {
      throw new Error(
        "Each specification should be at least 3 characters long."
      );
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

    let exists = await redisclient.exists("allProjects");
    if (exists) {
      console.log("redis cleared");
      await redisclient.json.del("allProjects");
      await redisclient.flushDb();
    }

    let existsClientProj = await redisclient.exists(`projects:${userId}`);
    if (existsClientProj) {
      console.log("redis cleared");
      await redisclient.json.del(`projects:${userId}`);
      await redisclient.flushDb();
    }

    return res.status(201).json(newProject);
  } catch (e) {
    console.error("Error creating project:", e);
    const errorMessage = e.message || "An unexpected error occurred";
    return res.status(500).json({ error: errorMessage });
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

    await client.index({
      index: "projects",
      id: updatedProject._id.toString(),
      body: {
        title: updatedProject.title,
        description: updatedProject.description,
        budget: updatedProject.budget,
        userId: updatedProject.userId.toString(),
        createdAt: updatedProject.createdAt,
      },
    });

    let exists = await redisclient.exists("allProjects");
    if (exists) {
      await redisclient.json.del("allProjects");
    }
    await redisclient.flushAll();

    return res.status(200).json(updatedProject);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found!" });
    }

    await client.delete({
      index: "projects",
      id: deletedProject._id.toString(),
    });

    let exists = await redisclient.exists("allProjects");
    if (exists) {
      await redisclient.json.del("allProjects");
    }
    await redisclient.flushAll();

    return res.status(200).json({ message: "Project deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getClientProject = async (req, res) => {
  const { userId } = req.params;
  console.log("Received userId:", userId);

  if (!userId) {
    return res.status(400).json({ error: "userId is missing or undefined" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    let exists = await redisclient.exists(`projects:${userId}`);
    if (exists) {
      console.log("projects from redis");
      let projects = await redisclient.json.get(`projects:${userId}`);
      return res.status(200).json(projects);
    }
    const projects = await Project.find({ userId: new ObjectId(userId) });

    console.log("Projects found:", projects);

    await redisclient.json.set(`projects:${userId}`, ".", projects);
    await redisclient.expire(`projects:${userId}`, 3600);
    console.log("projects not from redis");
    return res.status(200).json(projects);
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ error: e.message });
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
    let exists = await redisclient.exists("allProjects");
    if (exists) {
      console.log("allprojects from redis");
      let allProjects = await redisclient.json.get("allProjects");
      return res.status(200).json(allProjects);
    }

    const allProjects = await Project.find();

    await redisclient.json.set("allProjects", ".", allProjects);
    await redisclient.expire("allProjects", 3600);
    return res.status(200).json(allProjects);
  } catch (e) {
    console.error("Error fetching projects:", e);
    return res.status(500).json({ error: e.message });
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

export const searchProjectsByUserId = async (req, res) => {
  const { query } = req.query;
  const { userId } = req.params;

  try {
    if (!query && !userId) {
      return res
        .status(400)
        .json({ error: "At least one of query or userId is required." });
    }

    const esQuery = {
      bool: {
        must: [],
        filter: [],
      },
    };

    if (userId) {
      esQuery.bool.filter.push({
        term: {
          userId: userId,
        },
      });
    }

    if (query) {
      esQuery.bool.must.push({
        multi_match: {
          query,
          fields: ["title", "description"],
        },
      });
    }

    const result = await client.search({
      index: "projects",
      body: {
        query: esQuery,
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
