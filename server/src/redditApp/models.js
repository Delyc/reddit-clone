import mongoose from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2";
import { slug } from "./utils.cjs";

mongoose.plugin(slug);

const ReplySchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reply = mongoose.model("Reply", ReplySchema);

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CommentSchema.statics.deleteOwn = async function (user, id) {
  const comment = await this.findById(id).where({ user });
  if (comment) {
    await comment.delete();
    return true;
  }
  return false;
};

export const Comment = mongoose.model("Comment", CommentSchema);

const PostScema = new mongoose.Schema(
  {
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubReddit",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image:{
      type: String,
      required: false,
      default: "https://res.cloudinary.com/dci8tsnsb/image/upload/v1650072628/n7ac9rklqcyrzrs2qlay.jpg"

    },
    publicid:{
      type:String,
    },
    meta: {
      upvotes: Number,
      downvotes: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostScema.methods.getComments = async function () {
  const post = this;
  const comments = await Comment.find({ post: post._id }).populate({
    path: "user",
    model: "User",
    select: ["firstName", "lastName", "username", "!_id"],
  });
  return comments;
};

PostScema.pre("remove", async function (next) {
  await Comment.deleteMany({ post: this._id });
  next();
});

PostScema.statics.getBySub = async function (id) {
  const reddits = await this.find({ reddit: id });
  return reddits;
};

PostScema.methods.vote = async function (action) {
  const post = this;
  if (action === "up") {
    post.meta.upvotes = 0;
  }
};

PostScema.plugin(mongoosePaginator);

export const Post = mongoose.model("Post", PostScema);

const subredditSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: false,
    },
    slug: { type: String, slug: "title", unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
subredditSchema.plugin(mongoosePaginator);

subredditSchema.index({ title: "text" });
subredditSchema.methods.getPosts = async function () {
  let subreddit = this;
  const posts = await Post.find({ subreddit: subreddit._id });
  return posts;
};

subredditSchema.methods.countPosts = async function () {
  let subreddit = this;
  const posts = await Post.count({ subreddit: subreddit._id }).exec();
  return posts;
};

export const SubReddit = mongoose.model("SubReddit", subredditSchema);
