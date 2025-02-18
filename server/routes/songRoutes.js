import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Inside route");
});

export default router;
