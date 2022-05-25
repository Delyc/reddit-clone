import responseHandler from "./responseHandler.js";

export default (error, req, res, next) => {
  console.log(error);
  return responseHandler(res, 500, "Something went on server. Check logs");
};
