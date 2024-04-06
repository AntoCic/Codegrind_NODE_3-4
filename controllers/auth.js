import mongoose from "mongoose";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  if (!name || typeof name != "string") {
    return res
      .status(400)
      .json({ message: `key: "${key}" assente o non conforme` });
  }
  if (!surname || typeof surname != "string") {
    return res
      .status(400)
      .json({ message: `key: "${key}" assente o non conforme` });
  }
  if (!username || typeof username != "string") {
    return res
      .status(400)
      .json({ message: `key: "${key}" assente o non conforme` });
  }
  if (!email || typeof email != "string") {
    return res
      .status(400)
      .json({ message: `key: "${key}" assente o non conforme` });
  }
  if (!password || typeof password != "string") {
    return res
      .status(400)
      .json({ message: `key: "${key}" assente o non conforme` });
  }
  if (password.length < 8) {
    return res.status(400).json({
      message:
        'key: "password" troppo corta deve essere contenere min 8 caratteri',
    });
  }
  const passwordHashed = await bcrypt.hash(password, 12);
  const user = new User({
    name,
    surname,
    username,
    email,
    password: passwordHashed,
  });
  try {
    await user.save();
    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(409).json({ status: "error", message: error.message });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: error.message });
  if (await bcrypt.compare(password, user.password)){
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET)
    return res.status(200).json({ status: "ok", token: token});
  }
  res.status(401).json({ message: error.message });
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTAzNDE2NGFmM2Y3ODgzMTZjZWQ5YSIsInVzZXJuYW1lIjoiUGFsUmVkIiwiaWF0IjoxNzEyMzkyMzY4fQ.KA9rDFALpreQUz62a9_mOHHTSxQQpb3LAx7KhrsdxRw