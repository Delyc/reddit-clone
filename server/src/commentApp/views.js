import { Comment, Post } from "../redditApp/models.js";
import responseHandler from "../utils/responseHandler.js";

export const addComment = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return responseHandler(res, 404, "Not found");
  const data = {
    post: id,
    user: req.user._id,
    ...req.body,
  };
  const comment = await Comment.create(data);
  return responseHandler(res, 201, comment._doc);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const deleted = await Comment.deleteOwn(req.user._id, id);
  if (deleted) return responseHandler(res, 200, {});
  return responseHandler(res, 403, "Not allowed to delete others comments");
};

export const likeReddit = async (req, res) => {};

export const voteReddit = async (req, res) => {
  const { id, action } = req.params;
  let updated;
  if (action.toLowerCase() === "up") {
    updated = await Post.findByIdAndUpdate(
      id,
      { $inc: { "meta.upvotes": 1 } },
      { new: true }
    ).exec();
  } else if (action.toLowerCase() === "down") {
    updated = await Post.findByIdAndUpdate(
      id,
      { $inc: { "meta.downvotes": 1 } },
      { new: true }
    ).exec();
  }

  if (!updated) return responseHandler(res, 404, "Not found");

  return responseHandler(res, 200, updated);
};
