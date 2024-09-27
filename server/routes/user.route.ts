import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  UpdateAvatar,
  updatePassword,
  updateUserInfo,
} from "../controllers/user.controller";
import { isAuthenicated } from "../middleware/auth";

const useRouter = express.Router();

useRouter.post("/registration", registrationUser);
useRouter.post("/activation-user", activateUser);
useRouter.post("/login", loginUser);
useRouter.get("/logout", isAuthenicated, logoutUser);
useRouter.get("/refreshtoken", updateAccessToken);
useRouter.get("/me", isAuthenicated, getUserInfo);
useRouter.post("/social-auth", socialAuth);
useRouter.put("/update-user-info", isAuthenicated, updateUserInfo);
useRouter.put("/update-user-password", isAuthenicated, updatePassword);
useRouter.put("/update-user-avatar", isAuthenicated, UpdateAvatar);

export default useRouter;
