import { currentUser } from "./../../middlewares/current-user";
import request from "supertest";
import { app } from "../../app";

describe("current user", () => {
  it("responds with details about the current user", async () => {
    const authResponse = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const cookie = authResponse.get("Set-Cookie");

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie) //Set header on request
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });
});
