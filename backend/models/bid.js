import mongoose from "mongoose";
const { Schema } = mongoose;

const BidSchema = new Schema(
  {
    projectId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    estimated_days: {
      type: Number,
      required: true,
    },
    offer_price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bid", BidSchema);