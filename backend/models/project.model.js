import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Project title can't be empty!"],
      minlength: [5, "Title should be at least 5 characters long"],
      maxlength: [100, "Title should not exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description can't be empty!"],
      minlength: [10, "Description should be at least 10 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category can't be empty!"],
    },
    budget: {
      type: Number,
      required: [true, "Budget can't be empty!"],
      min: [1, "Budget should be greater than 0"],
    },
    img: {
      type: String,
      default: "https://via.placeholder.com/300x200", // Placeholder image URL
    },
    expected_delivery_time: {
      type: Date,
      required: [true, "Expected delivery time can't be empty!"],
    },
    specifications: {
      type: [String],
      required: [true, "Specifications can't be empty!"],
      validate: [
        {
          validator: (specs) => specs.length > 0,
          message: "At least one specification is required.",
        },
        {
          validator: (specs) => specs.every((spec) => spec.length >= 10),
          message: "Each specification should be at least 10 characters long.",
        },
      ],
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
