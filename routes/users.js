import express from "express";

import {
  getUsers,
  insertUsers,
  getUserById,
  delateUserById,
  updateUser,
} from "../controllers/users.js";


const router = express.Router();
router.get("/",getUsers);
router.post("/", insertUsers);
router.get("/:id", getUserById);
router.delete("/:id", delateUserById);
router.patch("/:id", updateUser);

export default router;
