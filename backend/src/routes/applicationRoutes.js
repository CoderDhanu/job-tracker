import express from "express";
const router = express.Router();

import {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

router.post("/create", createApplication);
router.get("/", getApplications);
router.put("/update/:id", updateApplication);
router.delete("/delete/:id", deleteApplication);

export default router;
