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
  uid: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1733884083~exp=1733887683~hmac=3acdac16f592cc2761772a7f961212010f6dc103c2024b14a37f084a7a552969&w=740"
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