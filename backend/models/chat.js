import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    freelancerId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    readByFreelancer: {
      type: Boolean,
      required: true,
    },
    readByClient: {
      type: Boolean,
      required: true,
    },
    latestMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", ChatSchema);