import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware";
import { createSong, deleteSong } from "../controllers/admin.controller";

const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs", protectRoute, requireAdmin, deleteSong);

export default router;
