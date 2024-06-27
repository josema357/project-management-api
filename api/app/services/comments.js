const boom = require("@hapi/boom");
const { models } = require("../../libs/connection");

class CommentService{
  /**
   * Create a Comment
   * @param {*} data comment data to create
   * @returns a promise that resolves with the new comment created
   */
  async create(data){
    const formatData = {
      ...data,
      userId: data.user_id,
      taskId: data.task_id
    }
    try {
      const comment = await models.Comment.create(formatData);
      return comment;
    } catch (error) {
      throw boom.badImplementation(error.message);
    } 
  }
  /**
   * Retrieves all comments
   * @returns an array of comment objects
   */
  async find_all(){
    try {
      const comments = await models.Comment.findAll();
      return comments;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  /**
   * Find comment by their id
   * @param {*} id identifier of the comment to find
   * @returns the comment object if found
   */
  async find_by_id(id){
    const comment = await models.Comment.findByPk(id);
    if(!comment){
      throw boom.notFound("Comment not found")
    }
    return comment;
  }
  /**
   * Update comment information
   * @param {*} id the id of the comment to update
   * @param {*} changes the changes to apply to the comment
   * @returns the updated comment object
   */
  async update(id, changes){
    const comment = await this.find_by_id(id);
    const response = comment.update(changes);
    return response;
  }
  /**
   * Delete comment
   * @param {*} id the id of the comment to delete
   * @returns the deleted comment object
   */
  async delete(id){
    const comment = await this.find_by_id(id);
    await comment.destroy();
    return {
      message: "Comment deleted",
      comment
    }
  }
}

module.exports = CommentService;