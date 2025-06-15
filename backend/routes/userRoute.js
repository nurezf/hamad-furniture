import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  adminRegister,
} from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/adminregister", adminRegister);

export default userRouter;
