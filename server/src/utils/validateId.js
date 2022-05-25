import mongoose from "mongoose";
import responseHandler from "./responseHandler.js";

export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (mongoose.isValidObjectId(id)) {
    return next();
  }

  return responseHandler(res, 404, "Not found");
};

export default validateId;
