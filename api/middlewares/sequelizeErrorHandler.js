const { ValidationError } = require("sequelize");

/**
 * Middleware to handle errors generated by Sequelize.
 * @param {*} err the error caught
 * @param {*} req the http request
 * @param {*} res the http response
 * @param {*} next the function to move to the next middleware
 */
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      name: err.name,
      message: err.message,
      errors: err.errors.map((error) => ({
        message: error.message,
        field: error.path,
        value: error.value,
      })),
    });
  }
  next(err);
}

module.exports = { ormErrorHandler };
