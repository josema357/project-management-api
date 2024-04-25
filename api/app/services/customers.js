const boom = require("@hapi/boom");
const { models } = require("../../libs/connection");
const { Op } = require("sequelize");

class CustomerService{
  /**
   * Create a customer in the database
   * @param {*} data customer data to create
   * @returns a promise that resolves with the new customer created
   */
  async create(data){
    try {
      const newCustomer = models.Customer.create(data);
      return newCustomer;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
  /**
   * Retrieves all customers from the database asynchronously.
   * @returns an array of Customer objects representing all customers in the database.
   */
  async find_all(){
    try {
      const customers = await models.Customer.findAll();
      return customers;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  /**
   * Retrieves all deleted customers from the database asynchronously.
   * @returns an array of Customer objects representing all deleted customer in the database.
   */
  async find_all_deleted(){
    const deletedCustomers = await models.Customer.findAll({
      where: {
        deleted_at: {
          [Op.ne]: null
        }
      },
      paranoid: false
    })
    return deletedCustomers;
  }
  /**
   * Find customer by their id
   * @param {*} id identifier of the customer to find
   * @returns the customer object if found
   */
  async find_by_id(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound("Customer not found")
    }
    return customer;
  }
  /**
   * Restore customer by their id
   * @param {*} id identifier of the customer to restore 
   * @returns the restored customer object
   */
  async restore_by_id(id){
    await models.Customer.restore({
      where: {
        id: id
      }
    });
    const customer = await this.find_by_id(id);
    return customer;
  }
  /**
   * Update customer information
   * @param {*} id the id of the customer to update
   * @param {*} changes the changes to apply to the customer
   * @returns the updated customer object
   */
  async update(id, changes){
    const customer = await this.find_by_id(id);
    const response = await customer.update(changes);
    return response;
  }
  /**
   * Delete customer
   * @param {*} id the id of the customer to delete
   * @returns the deleted customer object
   */
  async wipe_out(id, force){
    const customer = await this.find_by_id(id);
    const response = {
      message: "",
      customer
    }
    if(force){
      await customer.destroy({force: true});
      response.message = "Customer - hard deletion"
    }else{
      await customer.destroy();
      response.message = "Customer - soft deletion"
    }
    return response;
  }
}

module.exports = CustomerService;