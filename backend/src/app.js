const express = require("express");
const cors = require("cors");

const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins in non-production environments to preserve current behavior.
    if (!isProduction) {
      return callback(null, true);
    }

    // In production, only allow explicitly configured origins.
    if (!origin) {
      // Allow non-browser or same-origin requests without an Origin header.
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

module.exports = app;
