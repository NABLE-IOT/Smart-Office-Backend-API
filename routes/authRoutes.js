import express from "express";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-profile/:id").put(updateUser);
router.route("/delete-user/:id").delete(deleteUser);

export default router;
