//This is where all business logic is handled
import jwt from "jsonwebtoken";
import responseHandler from "../utils/responseHandler.js";
import { RefreshToken, User } from "./models.js";

export const LoginUser = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  }).exec();
  if (!user) return responseHandler(res, 400, "Invalid credentials");
  let userInfo = {
    email: user.email,
    _id: user._id,
    name: user.firstName,
  };
  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  let refreshToken = await RefreshToken.createToken(user);
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 60 * 24 * 7,
  });
  userInfo["token"] = accessToken;
  return responseHandler(res, 200, userInfo);
};

export const SignUp = async (req, res) => {
  const user = await User.create(req.body);
  const { password, ...data } = user._doc;
  if (user) return responseHandler(res, 201, data);
  return responseHandler(res, 400, "bad data");
};

export const refreshTokenView = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt)
    return responseHandler(
      res,
      "fail",
      401,
      "A valid jwt cookie missing. Login first"
    );

  const refreshToken = cookies.jwt;
  const userToken = await RefreshToken.findOne({
    token: refreshToken,
  }).populate("user");
  if (!userToken) {
    return responseHandler(
      res,
      "fail",
      403,
      "Refresh token is not in the database"
    );
  }

  if (RefreshToken.verifyExpiration(userToken)) {
    await RefreshToken.findByIdAndDelete(userToken._id).exec();
    res.clearCookie("jwt", { httpOnly: true });
    return responseHandler(
      res,
      "fail",
      403,
      "Refresh token expired. Log in is required"
    );
  }
  const accessToken = jwt.sign(
    {
      email: userToken.user.email,
      _id: userToken.user._id,
      roles: userToken.user.roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  return responseHandler(res, 200, { token: accessToken });
};

export const logoutView = async (req, res, next) => {
  const cookies = req.cookies;
  const accessToken = req.headers["authorization"];
  if (!cookies.jwt && !accessToken)
    return responseHandler(res, 200, "Log out successful");

  if (cookies.jwt) {
    const refreshToken = cookies.jwt;
    await RefreshToken.findOneAndDelete({
      token: refreshToken,
    }).exec();
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  }

  return responseHandler(res, 200, "Log out successful");
};
