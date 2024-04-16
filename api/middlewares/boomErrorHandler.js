/**
 *Middleware to handle Boom errors.
 * @param {*} err - The error caught.
 * @param {*} req - The HTTP request.
 * @param {*} res - The HTTP response.
 * @param {*} next - The function to move to the next middleware.
 */
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const response = {
      error: err.message,
      payload: err.output.payload,
    }
    return res.status(err.output.statusCode).json(response);
  }
  next(err);
}

module.exports = { boomErrorHandler };
