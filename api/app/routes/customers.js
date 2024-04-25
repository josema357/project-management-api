const express = require("express");
const CustomerService = require("../services/customers");
const { validatorHandler } = require("../../middlewares/validatorHandler");
const {
  createCustomerDTO,
  updateCustomerDTO,
  getCustomerDTO,
} = require("../dto/customers");

const router = express.Router();
const service = new CustomerService();

/**
 * Create a new customer
 * @param router the route path
 * @param validatorHandler middleware function to validate data to create a customer.
 * @param callback function to handle the route
 */
router.post(
  "/",
  validatorHandler(createCustomerDTO, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const customer = await service.create(body);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Restore a customer by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate customer data
 * @param callback function to handle the route
 */
router.post(
  "/restore/:id",
  validatorHandler(getCustomerDTO, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const restoredCustomer = await service.restore_by_id(id);
      res.json(restoredCustomer);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Get all customers
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/", async (req, res, next) => {
  try {
    const customers = await service.find_all();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});
/**
 * Get all deleted customers
 * @param router the route path
 * @param callback function to handle the route
 */
router.get("/eliminated", async (req, res, next) => {
  try {
    const deletedCustomers = await service.find_all_deleted();
    res.json(deletedCustomers);
  } catch (error) {
    next(error);
  }
});
/**
 * Request to retrieve a customer by id.
 * @param router the route path
 * @param validatorHandler middleware function to validate customer data
 * @param callback function to handle the route
 */
router.get(
  "/:id",
  validatorHandler(getCustomerDTO, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.find_by_id(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Update a customer
 * @param router the route path
 * @param validatorHandler middleware function to validate customer data
 * @param validatorHandler middleware function to validate customer changes.
 * @param callback function to handle the route
 */
router.patch(
  "/:id",
  validatorHandler(getCustomerDTO, "params"),
  validatorHandler(updateCustomerDTO, "body"),
  async (req, res, next) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * Delete a customer
 * @param router the route path
 * @param callback function to handle the route
 */
router.delete(
  "/:id",
  validatorHandler(getCustomerDTO, "params"),
  async (req, res, next) => {
    try {
      const isForceDelete = req.query.delete === "force";
      const { id } = req.params;
      const response = await service.wipe_out(id, isForceDelete);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
