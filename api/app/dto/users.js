const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00E0-\u00FD\s]+$/)
  .messages({
    "string.base": "\"name\" must be a string",
    "string.regex": "\"name\" must only contain letters, spaces and accents",
  });
const email = Joi.string().email().messages({
  "string.email": "\"email\" invalid format",
});
const password = Joi.string().trim().min(8).max(30)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,30}$/
  )
  .messages({
    "string.base": "\"password\" must be a string",
    "string.min": "\"password\" must be at least 8 characters long",
    "string.max": "\"password\" cannot exceed 30 characters",
    "string.pattern.base": "\"password\" must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
  });
const repeat_password = Joi.string().valid(Joi.ref('password')).messages({
    "any.only": "\"repeat_password\" must match the password",
    "any.required": "\"repeat_password\" is required"
});
const rol = Joi.string().valid("admin", "employee");

const createUserDTO = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    repeat_password: repeat_password.required(),
    rol: rol.required()
})

const updateUserDTO = Joi.object({
    name,
    rol,
    password,
    new_password: Joi.string().trim().min(8).max(30)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,30}$/
      )
      .messages({
        "string.base": "\"new_password\" must be a string",
        "string.min": "\"new_password\" must be at least 8 characters long",
        "string.max": "\"new_password\" cannot exceed 30 characters",
        "string.pattern.base": "\"new_password\" must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      })
      .when('password',{is: Joi.exist(), then: Joi.required()}),
    repeat_password: Joi.string().valid(Joi.ref('new_password'))
      .messages({
        "any.only": "\"repeat_password\" must match the password",
        "any.required": "\"repeat_password\" is required"
      }).when('new_password',{is: Joi.exist(), then: Joi.required()})
})

const getUserDTO = Joi.object({
    id: id.required(),
})

module.exports = {createUserDTO, updateUserDTO, getUserDTO};