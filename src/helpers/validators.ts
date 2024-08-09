import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import Logger from "../core/logger";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export default (
    schema: Joi.ObjectSchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);
      if (!error) return next();
      const { details } = error;
      const message = details
        .map((i: { message: string }) => i.message.replace(/['"]+/g, ""))
        .join(",");
      Logger.error(message);
      next(new Error(message));
    } catch (error) {
      next(error);
    }
  };
