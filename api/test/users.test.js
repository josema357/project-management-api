const request = require('supertest');
const app = require('../index');
const { faker } = require("@faker-js/faker");

let idUser;

describe("[routes / users]", () => {
  test("POST : should response with a 201 status code", async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "Test@97aaased",
      repeat_password: "Test@97aaased",
      rol: "employee",
    };
    const response = await request(app).post("/api/v1/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toEqual(userData.email);
    idUser = response.body.id;
  });
  test("GET : shold response with 200 status code", async ()=> {
    const response = await request(app).get("/api/v1/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  test("PATCH : should repsonse with 200 status code", async ()=> {
    const userData ={
      name: faker.person.fullName()
    }
    const response = await request(app).patch(`/api/v1/users/${idUser}`).send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', idUser);
  });
  test("DELETE : soft delete and should response with 200 status code", async ()=> {
    const response = await request(app).delete(`/api/v1/users/${idUser}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "User - soft deletion");
    expect(response.body).toHaveProperty("user");
  })
});
