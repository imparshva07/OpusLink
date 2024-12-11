import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const newUser =new User({
      name: "test",
      email: "test",
      password: "test",
      img: "test",
      isClient: false,
    });

    await newUser.save();
    res.status(201).send("User has been created")
  } catch (error) {
    res.status(500).send(error.message)
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
