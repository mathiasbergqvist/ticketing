import request from "supertest";
import { app } from "../../app";

describe("current user", () => {
  it("responds with details about the current user", async () => {
    const cookie = await global.signin();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie) //Set header on request
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });
});
