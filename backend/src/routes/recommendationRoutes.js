import express from "express";
const router = express.Router();
import { getRecommendations } from "../controllers/recommendationController.js";

router.get("/", getRecommendations);

export default router;
