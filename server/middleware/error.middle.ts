import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //duplicate key error
  if (err.statusCode === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json token is invalid`;
    err = new ErrorHandler(message, 400);
  }

  //jwt token expire
  if (err.name === "TokenExpiredError") {
    const message = `Json token is expired ,try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};