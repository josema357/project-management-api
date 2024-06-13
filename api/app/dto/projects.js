const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00E0-\u00FD\s]+$/)
  .messages({
    "string.base": "The name must be a string.",
    "string.regex": "The name must only contain letters, spaces and accents.",
  });
const description = Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00E0-\u00FD\s]+$/)
	.messages({
		"string.base": "The name must be a string.",
    "string.regex": "The name must only contain letters, spaces and accents.",
	});
const start_date = Joi.date().iso().messages({
	"date.format": "El campo debe ser una fecha válida en formato ISO (YYYY-MM-DD).",
});
const finish_date = Joi.date().iso().messages({
	"date.format": "El campo debe ser una fecha válida en formato ISO (YYYY-MM-DD).",
})
const status = Joi.string().valid('registered','started','in progress','finished');
const customer_id = Joi.number().integer();

const createProjectDTO = Joi.object({
	name: name.required(),
	description: description.required(),
	start_date: start_date.required(),
	finish_date: finish_date.required(),
	status: status.required(),
	customer_id: customer_id.required(),
})

const updateProjectDTO = Joi.object({
	name,
	description,
	start_date,
	finish_date,
	status,
	customer_id
})

const getProjectDTO = Joi.object({
	id: id.required(),
})

module.exports = {createProjectDTO, updateProjectDTO, getProjectDTO};