import { FreelancerProfile } from "../models/freeLancerProfile.model.js";

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfile = await FreelancerProfile.findOneAndUpdate(
      { userId: id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found!" });
    }
    return res.status(200).json(updatedProfile);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await FreelancerProfile.findOne({ userId: id });
    if (!profile) {
      throw "user profile does not exist!";
    } else {
      return res.status(200).json(profile);
    }
  } catch (e) {
    if (e === "user profile does not exist!") {
      return res.status(404).json({ error: e });
    }
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await FreelancerProfile.find();
    return res.status(200).json(allProfiles);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
