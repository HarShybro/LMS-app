import { NextFunction, Response, Request } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";

// Define the structure of the request body
interface CourseRequestBody {
  thumbnail?: string | { public_id: string; url: string };
}

export const uploadCourse = catchAsyncError(
  async (
    req: Request & { body: CourseRequestBody },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      console.log("Data:", data);
      if (data?.thumbnail && typeof data.thumbnail === "string") {
        const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      next(new ErrorHandler(error, 400));
    }
  }
);
