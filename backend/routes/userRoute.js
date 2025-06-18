import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  adminRegister,
  userProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

userRouter.get("/profile", authUser, userProfile);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/adminregister", adminRegister);

export default userRouter;
