import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    createrId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sold: {
        type: Boolean,
        required: true,
        default: false,
    },
    freelancerId: {
        type: String,
        required: false
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);