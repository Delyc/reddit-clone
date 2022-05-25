//Use this file to specify the routes for the app
//remember to include this routes in the index
import { Router } from "express";
import validate from "../utils/validate.js";
import { loginValidation, SignValidationRules } from "./validator.js";
import * as views from "./views.js";

const router = Router();



router.post("/login", loginValidation(), validate, views.LoginUser);
router.post("/signup", SignValidationRules(), validate, views.SignUp);
router.get("/refresh", views.refreshTokenView);
router.get("/logout", views.logoutView);

export default router;
