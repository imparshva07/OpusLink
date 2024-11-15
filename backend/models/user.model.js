import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  isFreelancer: {
    type: Boolean,
    default:false
  },
  bio: {
    type: String,
    required: false,
  }
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)