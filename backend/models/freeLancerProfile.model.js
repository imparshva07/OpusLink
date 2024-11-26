import mongoose from "mongoose";

const freelancerProfileSchema = new mongoose.Schema({
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    description: { 
      type: String, 
      required: [true, "Description can't be empty!"],
      minlength: [10, "Description should be at least 10 characters long"],
      default: 'Profile description'
    },
    skills: { 
      type: [String], 
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'A freelancer must have at least one skill.',
      },
      default:["No skill"]
    },
    hourlyRate: { 
      type: Number, 
      required: [true, "Hourly rate can't be empty!"], 
      min: [1, "Hourly rate should be greater than 0"],
      default: 1
    }, 
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }, { timestamps: true });
  
  export const FreelancerProfile = mongoose.model("FreelancerProfile", freelancerProfileSchema);