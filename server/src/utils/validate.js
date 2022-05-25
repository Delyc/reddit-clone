import { validationResult } from "express-validator";
import { responseHandler } from "./responseHandler.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const extractedErrors = {};
    errors.array().forEach((err) => {
      extractedErrors[err.param] = err.msg;
    });
    return responseHandler(res, 400, extractedErrors);
  };

  export default validate