const express = require("express");
const ProjectService = require("../services/projects");
const { validatorHandler } = require("../../middlewares/validatorHandler");
const {
  createProjectDTO,
  updateProjectDTO,
  getProjectDTO,
} = require("../dto/projects");

const router = express.Router();
const service = new ProjectService();

/**
 * Create a new project
 * @param router the route path
 * @param validatorHandler middleware function to validate data to create a project.
 * @param callback function to handle the route
 */
router.post(
  "/",
  validatorHandler(createProjectDTO, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const project = await service.create(body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Restore a project by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate project data
 * @param callback function to handle the route
 */
router.post("/restore/:id", validatorHandler(getProjectDTO, "params"), async(req, res, next)=>{
  try {
    const { id } = req.params;
    const restoredUser = await service.restore_by_id(id);
    res.json(restoredUser);
  } catch (error) {
    next(error);
  }
})
/**
 * Get all projects
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/", async (req, res, next) => {
  try {
    const projects = await service.find_all();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});
/**
 * Get all deleted projects
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/eliminated",async (req, res, next)=>{
  try {
    const deletedprojects = await service.find_all_deleted();
    res.json(deletedprojects);
  } catch (error) {
    next(error);
  }
})
/**
 * Request to retrieve a project by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate project data
 * @param callback function to handle the route
 */
router.get(
  "/:id",
  validatorHandler(getProjectDTO, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const project = await service.find_by_id(id);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Update a project
 * @param router the route path
 * @param validatorHandler middleware function to validate project data
 * @param validatorHandler middleware function to validate project changes.
 * @param callback function to handle the route
 */
router.patch(
  "/:id",
  validatorHandler(getProjectDTO, "params"),
  validatorHandler(updateProjectDTO, "body"),
  async (req, res, next) => {
    try {
      const { body, params: {id}} = req;
      const project = await service.update(id, body);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Delete a project
 * @param router the route path
 * @param callback function to handle the route
 */
router.delete("/:id", validatorHandler(getProjectDTO, "params"), async(req, res, next)=>{
  try {
    const isForceDelete = req.query.delete === "force";
    const { id } = req.params;
    const project = await service.wipe_out(id, isForceDelete);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
