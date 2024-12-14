import User from "../models/user.model.js";

/*
export const register = async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
*/

//adding user details to mongoDB 
export const register = async (req, res) => {
  try {
    const { name, email, uid, img, bio, isClient } = req.body;

    const user = await User.findOne({ uid });

    if (user) {
      res.status(422).send("User Already Registered!")
    }else{
      const newUser = new User({
        name, email, uid, img, bio, isClient
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
    console.log(user)
    console.log(uid)

    if (user) {
      res.status(201).send(user);
    } else {
      res.status(422).send("User not Found!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const logout = (req, res) => {};
