import request from "supertest";
import { app } from "../../app";

describe("signup", () => {
  it("returns 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pwd123",
      })
      .expect(201);
  });

  it("returns 400 on invalid email", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test.com",
        password: "pwd123",
      })
      .expect(400);
  });

  it("returns 400 on invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "a",
      })
      .expect(400);
  });

  it("returns 400 with missing email and password", async () => {
    return request(app).post("/api/users/signup").send({}).expect(400);
  });

  it("disallowes duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  xit("sets a cookie after successful signup", () => {
    const response = request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pwd123",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
