const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

router.post("/create", createApplication);
router.get("/", getApplications);
router.put("/update/:id", updateApplication);
router.delete("/delete/:id", deleteApplication);

module.exports = router;
