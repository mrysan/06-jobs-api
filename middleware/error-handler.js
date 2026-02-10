const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later!",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  //cast error (wrong value (id) provided)
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }

  // Validation error (missing values)
  if (err.name == "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  // duplicate email/values
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for: ${Object.keys(err.keyValue)} field. Please choose another value.`;
    customError.statusCode = 400;
  }
  // error object
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
