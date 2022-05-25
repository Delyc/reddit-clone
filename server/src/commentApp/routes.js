//Use this file to specify the routes for the app
//remember to include this routes in the index
import { Router } from "express";
import { verifyJWT } from "../authApp/middleware.js";
import responseHandler from "../utils/responseHandler.js";
import validate from "../utils/validate.js";
import validateId from "../utils/validateId.js";
import { commentValidation } from "./validator.js";
import * as views from "./views.js";

const router = Router();

router.post(
  "/:id",
  validateId,
  verifyJWT,
  commentValidation(),
  validate,
  views.addComment
);
router.post(
  "/:id/:action",
  validateId,
  (req, res, next) => {
    const { action } = req.params;
    const accepts = ["up", "down"];
    if (!accepts.includes(action.toLowerCase()))
      return responseHandler(res, 400, "Action should be 'up' or 'down.'");
    return next();
  },
  verifyJWT,
  views.voteReddit
);
router.delete("/:id", validateId, verifyJWT, views.deleteComment);

export default router;
