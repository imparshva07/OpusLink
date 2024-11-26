import { auth } from "../config/firebase.js";
import { User } from "../models/user.model.js";
import {FreelancerProfile} from "../models/freeLancerProfile.model.js"

export const registerUser = async (req, res) => {
  const { firebaseToken, name, role } = req.body;
  try {
    const decodedToken = await auth.verifyIdToken(firebaseToken);
    const firebaseUID = decodedToken.uid;
    const email = decodedToken.email;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    user = new User({ name, email, role, firebaseUID });
    await user.save();

    if (role.toLowerCase() === "freelancer") {

      const freelancerProfile = new FreelancerProfile({
        userId: user._id, // Reference the user ID
      });

      await freelancerProfile.save();

    }
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { firebaseToken } = req.body;
  try {
    const decodedToken = await auth.verifyIdToken(firebaseToken);
    const email = decodedToken.email;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Login successful",
      token: firebaseToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};
