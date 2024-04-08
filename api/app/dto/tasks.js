const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00E0-\u00FD\s]+$/)
  .messages({
    "string.base": "The name must be a string.",
    "string.regex": "The name must only contain letters, spaces and accents.",
  });
const description = Joi.string().trim().regex(/^[À-Zá-ż0-9 ]+$/)
.messages({
  "string.base": "The name must be a string.",
  "string.regex": "The name must only contain letters, spaces and accents.",
});
const status = Joi.string().valid('started','in progress','finished');
const project_id = Joi.number().integer();

const user_id = Joi.number().integer();
const task_id = Joi.number().integer();

const createTaskDTO = Joi.object({
  name: name.required(),
  description: description.required(),
  status: status.required(),
  project_id: project_id.required(),
});

const updateTaskDTO = Joi.object({
  name,
  description,
  status,
});

const getTaskDTO = Joi.object({
  id: id.required(),
})

const addUserDTO = Joi.object({
  user_id: user_id.required(),
  task_id: task_id.required(),
})

module.exports = {createTaskDTO, updateTaskDTO, getTaskDTO, addUserDTO};