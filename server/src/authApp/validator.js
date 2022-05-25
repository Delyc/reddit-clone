import { body } from "express-validator";
import { User } from "./models.js";

const ForbiddenUser = ["admin", "devil", "hell", "ceo", "reddit"];

export const SignValidationRules = () => [
  body("password", "Password is required").notEmpty(),
  body("email", "Email should be valid")
    .isEmail()
    .bail()
    .custom(async (value) => {
      const exist = await User.checkEmail(value);
      if (exist) return Promise.reject("Email is taken");
      return Promise.resolve();
    }),
  body("username", "Username should be valid")
    .isLength({
      min: 3,
      max: 30,
    })
    .bail()
    .custom(async (value) => {
      if (ForbiddenUser.indexOf("value") !== -1)
        return Promise.reject("This username is not acceptable");
      const exist = await User.checkUsername(value);
      if (exist) return Promise.reject("Username is taken");
      return Promise.resolve();
    }),
  body("firstName", "Name required").isLength({
    max: 30,
    min: 3,
  }),
  body("lastName", "Name required").isLength({
    max: 30,
    min: 3,
  }),
];

export const loginValidation = () => [
  body("username", "Username or email is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];
