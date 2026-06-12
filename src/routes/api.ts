import express from "express";
import authControler from "../controllers/auth.controler";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/auth/register", authControler.register);
router.post("/auth/login", authControler.login);
router.get("/auth/profile", authMiddleware, authControler.profile);

export default router;
