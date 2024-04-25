const express = require("express");
const UserService = require("../services/users");
const { validatorHandler } = require("../../middlewares/validatorHandler");
const { createUserDTO, updateUserDTO, getUserDTO } = require("../dto/users");

const router = express.Router();
const service = new UserService();

/**
 * Create a new user
 * @param router the route path
 * @param validatorHandler middleware function to validate data to create a user.
 * @param callback function to handle the route
 */
router.post(
  "/",
  validatorHandler(createUserDTO, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const user = await service.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Restore a user by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate user data
 * @param callback function to handle the route
 */
router.post(
  "/restore/:id",
  validatorHandler(getUserDTO, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const restoredUser = await service.restore_by_id(id);
      res.json(restoredUser);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Get all users
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await service.find_all();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
/**
 * Get all deleted users
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/eliminated", async (req, res, next) => {
  try {
    const deletedUsers = await service.find_all_deleted();
    res.json(deletedUsers);
  } catch (error) {
    next(error);
  }
});
/**
 * Request to retrieve a user by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate user data
 * @param callback function to handle the route
 */
router.get(
  "/:id",
  validatorHandler(getUserDTO, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.find_by_id(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Update a user
 * @param router the route path
 * @param validatorHandler middleware function to validate user data
 * @param validatorHandler middleware function to validate user changes.
 * @param callback function to handle the route
 */
router.patch(
  "/:id",
  validatorHandler(getUserDTO, "params"),
  validatorHandler(updateUserDTO, "body"),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Delete a user
 * @param router the route path
 * @param callback function to handle the route
 */
router.delete("/:id",validatorHandler(getUserDTO, "params"), async (req, res, next) => {
  try {
    const isForceDelete = req.query.delete === "force";
    const { id } = req.params;
    const response = await service.wipe_out(id, isForceDelete);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
