//Use this file to specify the routes for the app
//remember to include this routes in the index
import { Router } from "express";
import * as views from "./views.js";
import * as middleware from "./middleware.js";

const router = Router()


router.get("/:subreddit",views.getRelatedRedits)


export default router;
