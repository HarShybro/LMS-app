import { Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import CourseModel from "../models/course.model";

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(200).json({
      success: true,
      course,
    });
  }
);
