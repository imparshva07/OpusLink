import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", ChatSchema);