const boom = require("@hapi/boom");
const { models } = require("../../libs/connection");

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
    const users = await models.User.findAll();
    return users;
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
  async wipe_out(id) {
    const user = await this.find_by_id(id);
    await user.destroy();
    return {
      message: "User Deleted",
      user
    }
  }
}

module.exports = UserService;
