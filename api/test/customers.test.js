const request = require("supertest");
const app = require("../index");
const { faker } = require("@faker-js/faker");

let idCustomer;

describe("[routes / customers]", () => {
  test("POST : should response with a 201 status code", async () => {
    const customerData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.string.numeric({length: 9})
  }
    const response = await request(app).post("/api/v1/customers").send(customerData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toEqual(customerData.email);
    idCustomer = response.body.id;
  });
  test("GET : shold response with 200 status code", async ()=> {
    const response = await request(app).get("/api/v1/customers");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  test("PATCH : should repsonse with 200 status code", async ()=> {
    const customerData = {
      name: faker.person.fullName()
    }
    const response = await request(app).patch(`/api/v1/customers/${idCustomer}`).send(customerData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idCustomer);
  });
  test("DELETE : soft delete and should response with 200 status code", async ()=> {
    const response = await request(app).delete(`/api/v1/customers/${idCustomer}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Customer - soft deletion");
    expect(response.body).toHaveProperty("customer");
  })
})