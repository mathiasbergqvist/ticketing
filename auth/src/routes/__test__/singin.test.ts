import { Password } from "./../../services/password";
import request from "supertest";
import { app } from "../../app";

describe("signin", () => {
  it("fails when an email that not exsists is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "pwd123",
      })
      .expect(400);
  });

  it("fails when an incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pwd123",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "pwd234",
      })
      .expect(400);
  });

  it("responds with a cookie when given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pwd123",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "pwd123",
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
