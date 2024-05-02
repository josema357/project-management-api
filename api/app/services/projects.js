const boom = require("@hapi/boom");
const { Op } = require("sequelize");
const { models } = ("../../libs/connection.js");

class ProjectService {
  /**
   * Create a project
   * @param {*} data project data to create
   * @returns a promise that resolves with the new project created
   */
  async create(data){
    try {
      const newProject = models.Project.create(data);
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
   * Find projectby their id
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
}

module.exports = ProjectService;