export const responseHandler = (res, code, message) => {
  let status;
  code > 400 ? (status = "success") : (status = "fail");
  let response = { status, code: code };
  if (typeof message == "string") {
    response["message"] = message;
  } else {
    response["data"] = message;
  }
  return res.status(code).json(response);
};

export default responseHandler;
