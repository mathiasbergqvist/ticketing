import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  res.send("Foo bar");
});

export { router as signOutRouter };
