//This is where all business logic is handled
//Equivalent to middleware. Create functions that process request here
//Remember to import all in routes
import { Post } from "../redditApp/models.js";
import responseHandler from "../utils/responseHandler.js";

export const getRelatedRedits = async (req, res) => {
  const reddits = await Post.getBySub(req.params.subreddit);

  return responseHandler(res, 200, reddits);
};

