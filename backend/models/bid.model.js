import mongoose from "mongoose";
const { Schema } = mongoose;

const bidSchema = new Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bidAmount: {
      type: Number,
      required: [true, "Bid amount can't be empty!"],
      min: [1, "Bid amount should be greater than 0"],
    },
    proposal: {
      type: String,
      required: [true, "Proposal can't be empty!"],
      minlength: [10, "Proposal should be at least 10 characters long"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bid", bidSchema);
