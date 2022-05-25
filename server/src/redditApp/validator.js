import { body, check, param } from "express-validator";
import { Post, SubReddit } from "./models.js";

export const ReditValidation = () => [
  check("subreddit", "This need to be a valid mongo id").isMongoId().bail(),
  check("title", "Title is required")
    .notEmpty()
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("This is too short")
    .bail()
    .custom(async (value, { req, location, path }) => {
      const subreddit = req.body.subreddit;
      const exist = await SubReddit.findById(subreddit);
      if (!exist) return Promise.reject("This subreddit does not exist");
      const titleTaken = await Post.findOne({ subreddit, title: value });
      if (titleTaken)
        return Promise.reject("This title is taken in the subbredit");
      return Promise.resolve();
    }),
  body("body", "Body is required").notEmpty().isLength({
    min: 10,
  }),
];

export const subRedditValidation = () => [
  body("title", "Required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 50,
    })
    .withMessage("This is too short")
    .custom(async (value) => {
      const exist = await SubReddit.findOne({ title: value });
      if (exist) return Promise.reject("This title is taken");
      return Promise.resolve();
    }),
  body("summary", "It should have some contents").optional().isLength({
    min: 10,
  }),
];

export const CommentValidation = () => [
  body("body", "This is required").isLength({
    min: 23,
  }),
  param("post", "A valid id is required")
    .isMongoId()
    .bail()
    .custom(async (value) => {
      const exits = await Post.findById(value).exists();
      if (!exits) return Promise.reject("This post does not exist");
      return Promise.resolve();
    }),
];

export const validateReditId = () => [
  check("subreddit", "A valid id is required")
    .isMongoId()
    .bail()
    .custom(async (value) => {
      const exits = await SubReddit.findById(value).select("-id").lean();
      if (!exits) return Promise.reject("This subreddit does not exist");
      return Promise.resolve();
    }),
];
