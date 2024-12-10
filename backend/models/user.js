import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  isClient: {
    type: Boolean,
    default:false
  },
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)