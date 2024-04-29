const request = require('supertest');
const app = require('../index');


describe("[routes / users]", () => {
  it("should response with a 201 status code", async () => {
    const userData = {
      name: "testnumber one",
      email: "testone@hotmail.com",
      password: "Test@97aaased",
      repeat_password: "Test@97aaased",
      rol: "employee",
    };
    const response = await request(app).post("/api/v1/users").send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toEqual(userData.email);
  });
});
