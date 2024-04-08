const Joi = require('joi');

const id = Joi.number().integer();
const message = Joi.string().trim().regex(/^[À-Zá-ż0-9 ]+$/)
  .messages({
    "string.base": "The name must be a string.",
    "string.regex": "The name must only contain letters, spaces and accents.",
  });
const user_id = Joi.number().integer();
const task_id = Joi.number().integer();

const createCommentDTO = Joi.object({
  message: message.required(),
  user_id: user_id.required(),
  task_id: task_id.required(),
})

const updateCommentDTO = Joi.object({
  message,
})

const getCommentDTO = Joi.object({
  id: id.required(),
})

module.exports = {createCommentDTO, updateCommentDTO, getCommentDTO};