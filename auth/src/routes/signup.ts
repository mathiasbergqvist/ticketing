import express from "express";

const router = express.Router();

router.get("/api/users/signup", (req, res) => {
  res.send("Foo bar");
});

export { router as signUpRouter };
