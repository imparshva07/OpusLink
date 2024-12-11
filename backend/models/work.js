import mongoose from "mongoose";
const { Schema } = mongoose;

const WorkSchema = new Schema(
  {
    projectId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    freelancerId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Work", WorkSchema);