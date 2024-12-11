import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import userRoute from './routes/user.route.js'
import profileRoute from './routes/freelancerProfile.route.js'
import projectRoute from './routes/project.route.js'
import bidRoutes from "./routes/bid.route.js";
import client from "./config/elasticsearch.js";

const app = express();
configDotenv();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/project", projectRoute);
app.use("/api/bids", bidRoutes);

connectDB();

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

createIndex();
