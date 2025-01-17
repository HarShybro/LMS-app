import express from "express";
import { authorizeRoles, isAuthenicated } from "../middleware/auth";
import { uploadCourse } from "../controllers/course.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenicated,
  authorizeRoles("admin"),
  uploadCourse
);

export default courseRouter;
