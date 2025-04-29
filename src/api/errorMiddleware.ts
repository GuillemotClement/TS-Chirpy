import { NextFunction, Request, Response } from "express";
import { BadRequest } from "./errorClasse.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);
  if (err instanceof BadRequest) {
    res.status(400).json({
      error: err.message,
    });
  }
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}
