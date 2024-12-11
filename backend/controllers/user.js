import User from "../models/user.js";


export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
};
