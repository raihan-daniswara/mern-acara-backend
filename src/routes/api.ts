import express from "express";
import authControler from "../controllers/auth.controler";

const router = express.Router();

router.post("/auth/register", authControler.register);

export default router;
