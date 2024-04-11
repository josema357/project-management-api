const boom = require("@hapi/boom");

/**
 * Middleware to validate data using a DTO
 * @param {*} dto Joi schema used to validate the data
 * @param {*} property the name of the property in the request that contains the data to validate
 * @returns middleware to handle data validation
 */
function validatorHandler(dto, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = dto.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

module.exports = { validatorHandler };
