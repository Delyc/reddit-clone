import responseHandler from "../utils/responseHandler.js";
import { Comment, Post, SubReddit } from "./models.js";

export const CreateReddit = async (req, res) => {
  const data = {
    subreddit: req.params.subreddit,
    author: req.user._id,
    ...req.body,
  };
  if (req.file) {
    data.image = req.file.path;
    data.publicid = req.file.public_id;
  }
  const reddit = await Post.create(data);
  if (reddit) return responseHandler(res, 201, reddit);
  return responseHandler(res, 400, "Bad data");
};

export const createComment = async (req, res) => {
  const comment = await Comment.create({
    post: req.params.post,
    body: req.body.body,
    user: req.user.id,
  });
};

export const createSubReddit = async (req, res) => {
  const subreddit = await SubReddit.create(req.body);
  if (subreddit) return responseHandler(res, 201, subreddit._doc);
  return responseHandler(res, 400, "Bad data");
};

export const getReddits = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;

  const reddits = await Post.paginate(
    {},
    {
      page,
      limit,
      sort: "-createdAt",
      customLabels: {
        docs: "reddits",
        totalDocs: "totalReddits",
      },
    }
  );
  return responseHandler(res, 200, reddits);
};
export const subReddits = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const reddits = await SubReddit.paginate(
    {},
    {
      page,
      limit,
      sort: "-createdAt",
      customLabels: {
        docs: "reddits",
        totalDocs: "totalReddits",
      },
    }
  );
  return responseHandler(res, 200, reddits);
};

export const getReddit = async (req, res) => {
  const { id } = req.params;
  const reddit = await Post.findById(id);
  if (!reddit) return responseHandler(res, 404, "Not found");
  const data = {
    reddit,
    comments: await reddit.getComments(),
  };
  return responseHandler(res, 200, data);
};

export const getOptions = async (req, res) => {
  const subs = await SubReddit.find({});
  const options = subs.map(({ _id, title }) => ({
    name: title,
    id: _id,
  }));
  return responseHandler(res, 200, options);
};
