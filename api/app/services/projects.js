const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = require("../../libs/connection");

class ProjectService {
  /**
   * Create a project
   * @param {*} data project data to create
   * @returns a promise that resolves with the new project created
   */
  async create(data){
    const formatData = {
      ...data,
      startDate: data.start_date,
      finishDate: data.finish_date,
      customerId: data.customer_id
    }
    try {
      const newProject = models.Project.create(formatData);
      return newProject;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
  /**
   * Retrieves all projects
   * @returns an array of project objects
   */
  async find_all(){
    try {
      const projects = models.Project.findAll();
      return projects;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  /**
   * Retrieves all deleted projects
   * @returns an array of projects object representing all deleted project
   */
  async find_all_deleted(){
    const deletedCustomers = await models.Project.findAll({
      where: {
        deleted_at: {
          [Op.ne]: null
        }
      },
      paranoid: false
    });
    return deletedCustomers;
  }
  /**
   * Find project by their id
   * @param {*} id identifier of the project to find
   * @returns the project object if found
   */
  async find_by_id(id){
    const project = await models.Project.findByPk(id);
    if(!project){
      throw boom.notFound("Project not found")
    }
    return project;
  }
  /**
   * Restore user by their id
   * @param {*} id identifier of the user to restore 
   * @returns the restored user object
   */
  async restore_by_id(id){
    await models.Project.restore({
      where: {
        id: id
      }
    });
    const project = await this.find_by_id(id);
    return project;
  }
  /**
   * Update project information
   * @param {*} id the id of the project to update
   * @param {*} changes the changes to apply to the project
   * @returns the updated project object
   */
  async update(id, changes){
    const project = await this.find_by_id(id);
    const formatChanges = {
      ...changes,
      startDate: changes.start_date,
      finishDate: changes.finish_date,
      customerId: changes.customer_id
    }
    const response = await project.update(formatChanges);
    return response;
  }
  /**
   * Delete project
   * @param {*} id the id of the project to delete
   * @returns the deleted project object
   */
  async wipe_out(id, force){
    const project = await this.find_by_id(id);
    const response={
      message: "",
      project
    }
    if(force){
      await project.destroy({
        force: true
      });
      response.message = "Project - hard deletion"
    }else{
      await project.destroy();
      response.message = "Project - soft deletion"
    }
    return response;
  }
}

module.exports = ProjectService;