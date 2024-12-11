import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid });

    if (user) {
      res.status(201).send(user);
    } else {
      res.status(422).send("User not Found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
};
