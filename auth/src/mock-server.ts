import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "./app";
import { error, info, log } from "./logger";

const start = async () => {
  let mongo: any;

  try {
    process.env.JWT_KEY = "test-key-123";

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    log(info("Connected to MongoDB 🔌"));
  } catch (err) {
    log(error("Failed to connect to db", err));
  }

  app.listen(3003, () => {
    log(info("AUTH: Server started on port 3003 🚀"));
  });
};

start();
