import { DataBaseConnectionError } from "./../errors/database-connection-error";
import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "./../errors/request-validation-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("RequestValidationError", err);
  }

  if (err instanceof DataBaseConnectionError) {
    console.log("DataBaseConnectionError", err);
  }

  res.status(405).send({
    message: err.message,
  });
};
