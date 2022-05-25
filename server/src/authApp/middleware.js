import "dotenv/config";
import jwt from "jsonwebtoken";
import responseHandler from "../utils/responseHandler.js";

const { TokenExpiredError } = jwt;

export const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return responseHandler(res, 401, "Unauthorized! Access Token expired");
  }
  return responseHandler(res, 401, "Unauthorized. Invalid Token received");
};

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return responseHandler(res, 401, "Unauthorized. Missing token in header");
  const token = authHeader.split(" ")[1];
  if (!token) {
    return responseHandler(res, 401, "Unauthorized. Missing token in header");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded._id;
    req.user = decoded;
    next();
  });
};
