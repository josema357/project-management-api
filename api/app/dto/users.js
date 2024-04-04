const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00E0-\u00FD\s]+$/)
  .messages({
    "string.base": "The name must be a string.",
    "string.regex": "The name must only contain letters, spaces and accents.",
  });
const email = Joi.string().email().messages({
  "string.email": "Invalid email format. Please enter a valid email address.",
});
const password = Joi.string().trim().min(8).max(30)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,30}$/
  )
  .messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be at least 8 characters long.",
    "string.max": "The password cannot exceed 30 characters.",
    "string.regex": "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
  });
const repeat_password = Joi.string().valid(Joi.ref('password')).messages({
    "any.ref": "The password confirmation must match the password.",
    "any.required": "The password confirmation is required."
});
const rol = Joi.string();

const createUserDTO = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    repeat_password: repeat_password.required(),
    rol: rol.required()
})

const updateUserDTO = Joi.object({
    name,
    email,
    rol,
    password: password.when('rol', {is: Joi.exist(), then: Joi.required()})
})

const updatePasswordDTO = Joi.object({
    old_password: Joi.string(),
    new_password: password.when('old_password',{is: Joi.exist(), then: Joi.required()}),
    repeat_password: repeat_password.when('new_password',{is: Joi.exist(), then: Joi.required()})
})

const getUserDTO = Joi.object({
    id: id.required(),
})
