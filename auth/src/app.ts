import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { signInRouter } from "./routes/singin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";

const app = express();
app.set("trust proxy", true); // Allow traffic through ngnx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // Only set cookies over an https connection for all env ecept test
  })
);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
