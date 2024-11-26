import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import userRoute from './routes/user.route.js'
import profileRoute from './routes/freelancerProfile.route.js'
import projectRoute from './routes/project.route.js'

const app = express();
configDotenv();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/project", projectRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
