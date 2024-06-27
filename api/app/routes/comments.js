const express = require("express");
const CommentService = require("../services/comments");
const { validatorHandler } = require("../../middlewares/validatorHandler");
const { createCommentDTO, updateCommentDTO, getCommentDTO } = require("../dto/comments");

const router = express.Router();
const service = new CommentService();

/**
 * Create a new comment
 * @param router the route path
 * @param validatorHandler middleware function to validate data to create a comment.
 * @param callback function to handle the route
*/
router.post("/", validatorHandler(createCommentDTO, "body"), async(req, res, next) => {
  try {
    const { body } = req;
    const comment = await service.create(body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});
/**
 * Get all comments
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/", async(req, res, next) => {
  try {
    const comments = await service.find_all();
    res.json(comments);
  } catch (error) {
    next(error);
  }
});
/**
 * Request to retrieve a comment by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate comment data
 * @param callback function to handle the route
 */
router.get("/:id", validatorHandler(getCommentDTO, "params"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await service.find_by_id(id);
    res.json(comment)
  } catch (error) {
    next(error);
  }
});
/**
 * Update a comment
 * @param router the route path
 * @param validatorHandler middleware function to validate comment data
 * @param validatorHandler middleware function to validate comment changes.
 * @param callback function to handle the route
 */
router.patch("/:id", validatorHandler(getCommentDTO, "params"), validatorHandler(updateCommentDTO, "body"), async (req, res, next) => {
  try {
    const { body, params: {id}} = req;
    const comment = await service.update(id, body);
    res.json(comment);
  } catch (error) {
   next(error); 
  }
});
/**
 * Delete a comment
 * @param router the route path
 * @param callback function to handle the route
 */
router.delete("/:id", validatorHandler(getCommentDTO, "params"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await service.delete(id);
    res.json(comment);
  } catch (error) {
    next(error);
  }
})

module.exports = router;