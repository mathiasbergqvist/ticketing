import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { signInRouter } from "./routes/singin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { log, info, error } from "./logger";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";

const app = express();
app.set("trust proxy", true); // Allow traffic through ngnx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
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

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    log(info("Connected to MongoDB 🔌"));
  } catch (err) {
    log(error("Failed to connect to db", err));
  }

  app.listen(3001, () => {
    log(info("AUTH: Server started on port 3001 🚀"));
  });
};

start();
