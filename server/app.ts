require("dotenv").config();

import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.middle";
import useRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";

export const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

const corsOptions: optionType = {
  origin: "http://localhost:3000/",
  methods: "GET,POST,PATCH,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
};

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

app.use("/api/v1/", useRouter);
app.use("/api/v1/", courseRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    sucess: true,
    message: "API is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route at ${req.originalUrl} not found `) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);
