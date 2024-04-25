const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00E0-\u00FD\s]+$/)
  .messages({
    "string.base": "The name must be a string.",
    "string.pattern.base": "\"name\" must only contain letters, spaces and accents."
  });
const email = Joi.string().email().messages({
  "string.email": "Invalid email format. Please enter a valid email address.",
});
const phone = Joi.string().trim().min(9).messages({
  "number.min": "Phone number should be 9 digits"
});

const createCustomerDTO = Joi.object({
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
});

const updateCustomerDTO = Joi.object({
  name,
  email,
  phone,
});

const getCustomerDTO = Joi.object({
  id: id.required(),
});

module.exports = {createCustomerDTO, updateCustomerDTO, getCustomerDTO};

