require("dotenv").config();

/**
 * Middleware to keep track of errors in the application.
 * @param {*} err the error caught.
 * @param {*} req the HTTP request.
 * @param {*} res the HTTP response.
 * @param {*} next the function to move to the next middleware.
 */
function logErrors(err, req, res, next) {
  console.error("Error:", err.message);
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    console.error("Stack trace:", err.stack);
  }
  next(err);
}

module.exports = { logErrors };
