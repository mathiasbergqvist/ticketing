import { error } from "./../logger";
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
    const formattedErrors = err.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));

    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DataBaseConnectionError) {
    return res.status(500).send({
      errors: [
        {
          message: err.reason,
        },
      ],
    });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
