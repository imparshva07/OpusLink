import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  userId: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  info: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  budget: {
    type: Number,
    required: false,
  },
  img: {
    type: String,
    required:false
  },
  deliveryDays: {
    type: Number,
    required:false
  },
  specifications: {
    type: [String],
    required:false
  },
},{
  timestamps:false
});

export default mongoose.model("Project", ProjectSchema)