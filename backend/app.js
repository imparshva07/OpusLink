import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.js";
import bidRoute from "./routes/bid.route.js";
import projectRoute from "./routes/project.route.js";
import authRoute from "./routes/auth.js";
import client from "./config/elasticsearch.js";
import { createIndex } from "./controllers/project.controller.js";
import { Project } from "./models/project.model.js";
import { indexProject } from "./controllers/project.controller.js";

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    console.log(process.env.MONGO_URI + "/" + process.env.DB_NAME);
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

app.listen(3000, () => {
  connect();
  console.log("Server is running on port 3000");
});

createIndex();