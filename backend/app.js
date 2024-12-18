import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import bidRoute from "./routes/bid.route.js";
import projectRoute from "./routes/project.route.js";
import authRoute from "./routes/auth.route.js";
import client from "./config/elasticsearch.js";
import { createIndex } from "./controllers/project.controller.js";
import { Project } from "./models/project.model.js";
import { indexProject } from "./controllers/project.controller.js";
import chatRoutes from "./routes/chat.route.js";
import http from "http";
import { Server } from "socket.io";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI + "/" + process.env.DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/bids", bidRoute);
app.use("/api/projects", projectRoute);
app.use("/api/auth", authRoute);

// app.listen(3000, () => {
//   connect();
//   console.log("Server is running on port 3000");
// });

createIndex();

app.use("/api/chat", chatRoutes);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//elastic search sync on server start
const syncElasticsearch = async () => {
  const indexName = "projects";

  try {
    const indexExists = await client.indices.exists({ index: indexName });
    if (indexExists) {
      await client.indices.delete({ index: indexName });
      console.log(`Index "${indexName}" deleted.`);
    }

    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            description: { type: "text" },
            budget: { type: "float" },
            userId: { type: "keyword" },
            createdAt: { type: "date" },
          },
        },
      },
    });
    console.log(`Index "${indexName}" created with mappings.`);

    const projects = await Project.find();
    for (const project of projects) {
      await client.index({
        index: indexName,
        id: project._id.toString(),
        body: {
          title: project.title || "Untitled",
          description: project.description || "No description available",
          budget: project.budget || 0,
          userId: project.userId ? project.userId.toString() : "Unknown",
          createdAt: project.createdAt || new Date(),
        },
      });
      console.log(`Elasticsearch: Project indexed with ID ${project._id}`);
    }
    console.log("All projects reindexed successfully!");
  } catch (error) {
    console.error("Error resetting Elasticsearch index:", error);
  }
};

syncElasticsearch();

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  app.set("io", io);
  // User joins a chat room
  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room ${data}`);
  });

  socket.on("sendMessage", (data) => {
    console.log(data + " here is data");
    const { chatId, newMessage } = data;
    io.to(chatId).emit("receiveMessage", newMessage);
    console.log(`Message sent to room ${chatId}:`, newMessage);
    io.emit("newMessage", {
      chatId,
      lastMessage: newMessage.text, // Send the text of the latest message
      timestamp: newMessage.timestamp || new Date(),
    });
  });
  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  connect();
  console.log(`Server ----> running on http://localhost:${PORT}`);
});
