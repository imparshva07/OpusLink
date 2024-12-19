import User from "../models/user.model.js";

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw "user does not exist!";
    } else {
      return res.status(200).json(user);
    }
  } catch (e) {
    if (e === "user does not exist!") {
      return res.status(404).json({ error: e });
    }
    return res.status(500).json({ error: e });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res.status(200).json(updatedUser);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getAll = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const getAllFreelancers = async (req, res) => {
  try {
    const allUsers = await User.find({ isClient: false });
    return res.status(200).json(allUsers);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
