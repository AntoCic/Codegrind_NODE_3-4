// import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { User } from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const insertUsers = async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Id non conforme" });
  try {
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const delateUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Id non conforme" });
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Delate" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Id non conforme" });
  try {
    const user = await User.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
