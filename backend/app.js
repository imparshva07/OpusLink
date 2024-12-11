import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import bidRoute from "./routes/bid.js";
import chatRoute from "./routes/chat.js";
import messageRoute from "./routes/message.js";
import projectRoute from "./routes/project.js";
import workRoute from "./routes/work.js";
import authRoute from "./routes/auth.js";

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

app.use("/api/users", userRoute);
app.use("/api/bids", bidRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/projects", projectRoute);
app.use("/api/works", workRoute);
app.use("/api/auth", authRoute);


app.listen(3000, () => {
  connect();
  console.log("Server is running on port 3000");
});
