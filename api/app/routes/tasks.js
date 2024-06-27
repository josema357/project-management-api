const express = require("express");
const TaskService = require("../services/tasks");
const { validatorHandler } = require("../../middlewares/validatorHandler");
const { createTaskDTO, updateTaskDTO, getTaskDTO } = require("../dto/tasks");

const router = express.Router();
const service = new TaskService();

/**
 * Create a new task
 * @param router the route path
 * @param validatorHandler middleware function to validate data to create a task.
 * @param callback function to handle the route
*/
router.post("/", validatorHandler(createTaskDTO, "body"), async(req, res, next) => {
  try {
    const { body } = req;
    const task = await service.create(body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
})
/**
 * Get all task
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/", async(req, res, next) => {
  try {
    const tasks = await service.find_all();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});
/**
 * Request to retrieve a task by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate task data
 * @param callback function to handle the route
 */
router.get("/:id", validatorHandler(getTaskDTO, "params"), async(req, res, next) => {
  try {
    const { id } = req.params;
    const task = await service.find_by_id(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
})
/**
 * Update a task
 * @param router the route path
 * @param validatorHandler middleware function to validate task data
 * @param validatorHandler middleware function to validate task changes.
 * @param callback function to handle the route
 */
router.patch("/:id", validatorHandler(getTaskDTO, "params"), validatorHandler(updateTaskDTO, "body"), async(req, res, next) => {
  try {
    const { body, params: { id }} = req;
    const task = await service.update(id, body);
    res.json(task);
  } catch (error) {
    next(error);
  }
})
/**
 * Delete a task
 * @param router the route path
 * @param callback function to handle the route
 */
router.delete("/:id", validatorHandler(getTaskDTO, "params"), async(req, res, next) => {
  try {
    const isForceDelete = req.query.delete === "force";
    const { id } = req.params;
    const task = await service.delete(id, isForceDelete);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
})

module.exports = router;