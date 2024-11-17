import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can't be empty!"],
      match: /^[a-zA-Z ]{2,50}$/,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z ]+$/.test(value);
        },
        message: "Invalid name (2-50 characters, letters only)",
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email can't be empty!"],
    },
    role: {
      type: String,
      enum: ["freelancer", "client"],
      required: [true, "Role can't be empty!"],
    },
    firebaseUID: {
      type: String,
      unique: true,
      required: [true, "Firebase UID is required!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
