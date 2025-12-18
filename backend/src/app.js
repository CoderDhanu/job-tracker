const express = require("express");
const cors = require("cors");

const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

module.exports = app;
