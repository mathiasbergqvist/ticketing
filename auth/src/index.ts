import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/singin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { log, info } from "./logger";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.listen(3001, () => {
  log(info("AUTH: Server started on port 3001 🚀"));
});
