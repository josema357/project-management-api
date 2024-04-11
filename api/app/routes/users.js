const express = require("express");
const UserService = require("../services/users");
const {validatorHandler} = require("../../middlewares/validatorHandler");
const {
  createUserDTO,
  updatePasswordDTO,
  updateUserDTO,
  getUserDTO,
} = require("../dto/users");

const router = express.Router();
const service = new UserService();

/**
  * Create a new user.
  * @param {*} req the HTTP request object.
  * @param {*} req.body the user data to create.
  * @param {*} res the HTTP response object.
  * @param {*} next the function to move to the next middleware.
  * @returns a promise that resolves when the user is created.
  * @throws {*} if an error occurs while creating the user.
*/
router.post("/", validatorHandler(createUserDTO, 'body'), async(req, res, next)=>{
  try {
    const { body } = req;
    const user = await service.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;