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
}

module.exports = UserService;
