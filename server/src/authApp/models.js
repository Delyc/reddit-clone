import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    username: {
      type: String,
      unique: true,
      minlength: 3,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});
userSchema.methods.checkPass = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

userSchema.statics.checkUsername = async function (username) {
  const users = await this.findOne({ username });
  if (users) return true;
  return false;
};
userSchema.statics.checkEmail = async function (email) {
  const users = await this.findOne({ email });
  if (users) return true;
  return false;
};

export const User = mongoose.model("User", userSchema);

const ResetToken = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expiryDate: Date,
  expired: {
    type: Boolean,
    default: false,
  },
});
ResetToken.statics.createToken = async function (user) {
  let expireAt = new Date();
  expireAt.setSeconds(expireAt.getSeconds() + 600);
  let token = uuid();
  let object = new this({
    token: token,
    user: user,
    expiryDate: expireAt.getTime(),
  });
  let newToken = await object.save();
  return newToken.token;
};

ResetToken.methods.checkValid = async function () {
  let token = this;
  const isValid = (await token.expiryDate.getTime()) > new Date().getTime();
  if (isValid) return this.token;
  await this.delete();
  return null;
};
ResetToken.methods.dump = async function () {
  let token = this;
  await token.delete();
  return true;
};

export const resetTokenModel = mongoose.model("ResetToken", ResetToken);

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});
const jwtRefreshExpiration = 2000;

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + parseInt(jwtRefreshExpiration));
  let token = uuid();
  let object = new this({
    token: token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });
  let refreshToken = await object.save();
  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = function (token) {
  return token.expiryDate.getTime() < new Date().getTime();
};

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
