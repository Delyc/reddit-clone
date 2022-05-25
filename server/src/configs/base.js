import { config, uploader } from "cloudinary";
import "dotenv/config";
import multer from "multer";
import path from "path";
import { parser } from "../redditApp/utils.cjs";

export const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  }),
    next();
};

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
});

export const cloudinaryMiddleware = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    ).content;
    const result = await uploader.upload(file);
    if (!result) {
      return next();
    }
    req.file.path = result.url;
    req.file.public_id = result.public_id;
    return next();
  }
  return next();
};
