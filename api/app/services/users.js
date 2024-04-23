const boom = require("@hapi/boom");
const { models } = require("../../libs/connection");
const { Op } = require("sequelize");

class UserService {
  /**
   * create a user in the database
   * @param {*} data user data to create
   * @returns a promise that resolves with the new user created
   */
  async create(data) {
    try {
      const new_user = await models.User.create(data);
      return new_user;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
  /**
   * Retrieves all users from the database asynchronously.
   * @returns an array of User objects representing all users in the database.
   */
  async find_all() {
    const users = await models.User.findAll({
      attributes: {
        exclude: ["email", "password"]
      },
    });
    return users;
  }
  /**
   * Retrieves all deleted users from the database asynchronously.
   * @returns an array of User objects representing all deleted users in the database.
   */
  async find_all_deleted(){
    const deletedUsers = await models.User.findAll({
      where: {
        deleted_at: {
          [Op.ne]: null
        }
      },
      paranoid: false
    });
    return deletedUsers;
  }
  /**
   * Find user by their id
   * @param {*} id identifier of the user to find
   * @returns the user object if found or throws a `Boom` not found exception
   */
  async find_by_id(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound("User not found")
    }
    return user;
  }
  /**
   * Restore user by their id
   * @param {*} id identifier of the user to restore 
   * @returns the restored user object
   */
  async restore_by_id(id){
    await models.User.restore({
      where: {
        id: id
      }
    });
    const user = await this.find_by_id(id);
    return user;
  }
  /**
   * Update user information
   * @param {*} id the id of the user to update
   * @param {*} changes the changes to apply to the user
   * @returns the updated user object
   */
  async update(id, changes){
    const user = await this.find_by_id(id)
    if("password" in changes && user.dataValues.password !== changes.password){
      throw boom.notFound("Incorrect old password")
    }
    const response = await user.update({ ...changes, password: changes.new_password});
    return response;
  }
  /**
   * Delete user
   * @param {*} id the id of the user to delete
   * @returns the deleted user object
   */
  async wipe_out(id, force) {
    const user = await this.find_by_id(id);
    const response={
      message: "",
      user
    }
    if(force){
      await user.destroy({
        force: true
      });
      response.message="User - hard deletion"
    }else{
      await user.destroy();
      response.message="User - soft deletion"
    }

    return response;
  }
}

module.exports = UserService;
