import { body } from "express-validator";

export const commentValidation = () => [
  body("body", "This is required").notEmpty().isLength({
    min: 4,
    max: 500,
  }),
];
