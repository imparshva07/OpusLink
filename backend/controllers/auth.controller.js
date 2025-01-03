import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, uid, img, bio, isClient } = req.body;

    const user = await User.findOne({ uid });

    if (user) {
      res.status(422).send("User Already Registered!");
    } else {
      const newUser = new User({
        name,
        email,
        uid,
        img,
        bio,
        isClient,
      });
      const registerUser = await newUser.save();

      res.status(201).send("User registered Successfully!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { uid } = req.body;

    const user = await User.findOne({ uid });
    console.log(user);

    if (user) {
      res.status(201).send(user);
    } else {
      res.status(422).send("User not Found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findOne({ _id });
    console.log(user);

    if (user) {
      res.status(201).send(user);
    } else {
      res.status(422).send("User not Found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
