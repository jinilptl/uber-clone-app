import express from "express";
import {
  register,
  login,
  logoutUser,
  getUserProfile,
} from "../Controllers/user.controllers.js";

import { authUser } from "../middlewares/auth.middlewares.js";

import { body } from "express-validator";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  register
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  login
);

userRouter.get("/profile", authUser, getUserProfile);

userRouter.get("/logout", authUser, logoutUser);

export default userRouter;
