require("dotenv").config();

/**
 * Middleware to handle errors not handled by other middlewares.
 * @param {*} err error detected.
 * @param {*} req the HTTP request.
 * @param {*} res the HTTP response.
 * @param {*} next the function to move to the next middleware.
 */
function errorHanlder(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Error details are hidden in production."
        : err.stack,
  });
}

module.exports = { errorHanlder };
