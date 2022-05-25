//Use this file to specify the routes for the app
//remember to include this routes in the index
import { Router } from "express";
import { verifyJWT } from "../authApp/middleware.js";
import { cloudinaryMiddleware, upload } from "../configs/base.js";
import { getRelatedRedits } from "../subredditApp/views.js";
import validate from "../utils/validate.js";
import validateId from "../utils/validateId.js";
import {
  ReditValidation,
  subRedditValidation,
  validateReditId,
} from "./validator.js";
import * as views from "./views.js";
const router = Router();

router.get("/all", views.getReddits);
router.get("/sub", views.subReddits);
router.get("/options", views.getOptions);
router.get("/sub/:id", validateId, views.getReddit);
router.post(
  "/",
  verifyJWT,
  subRedditValidation(),
  validate,
  views.createSubReddit
);
router.post(
  "/sub",
  verifyJWT,
  upload.single("image"),
  ReditValidation(),
  validate,
  cloudinaryMiddleware,
  views.CreateReddit
);
router.get(
  "/:subreddit",
  verifyJWT,
  validateReditId(),
  validate,
  getRelatedRedits
);

export default router;
