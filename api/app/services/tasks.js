const boom = require("@hapi/boom");
const { models } = require("../../libs/connection");
const { response } = require("express");

class TaskService{
  /**
   * Create a Task
   * @param {*} data task data to create
   * @returns a promise that resolves with the new task created
   */
  async create(data){
    const formatData = {
      ...data,
      projectId: data.project_id
    }
    try {
      const newTask = await models.Task.create(formatData);
      return newTask;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
  /**
   * Retrieves all tasks
   * @returns an array of task objects
   */
  async find_all(){
    try {
      const tasks = await models.Task.findAll();
      return tasks;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  /**
   * Find task by their id
   * @param {*} id identifier of the task to find
   * @returns the task object if found
   */
  async find_by_id(id){
    const task = await models.Task.findByPk(id);
    if(!task){
      throw boom.notFound("Task not found");
    }
    return task;
  }
  /**
   * Update task information
   * @param {*} id the id of the task to update
   * @param {*} changes the changes to apply to the task
   * @returns the updated task object
   */
  async update(id, changes){
    const task = await this.find_by_id(id);
    const response = await task.update(changes);
    return response;
  }
  /**
   * Delete task
   * @param {*} id the id of the task to delete
   * @returns the deleted task object
   */
  async delete(id, force){
    const task = await this.find_by_id(id);
    const response = {
      message: "",
      task
    }
    if(force){
      await task.destroy({
        force: true
      })
      response.message = "Task - hard deletion";
    }else {
      await task.destroy();
      response.message = "Task - soft deletion"
    }
    return response;
  }
}

module.exports = TaskService;