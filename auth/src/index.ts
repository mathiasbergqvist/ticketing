import { log, info, error } from "./logger";
import mongoose from "mongoose";
import { app } from "./app";

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

  app.listen(3000, () => {
    log(info("AUTH: Server started on port 3000 🚀"));
  });
};

start();
