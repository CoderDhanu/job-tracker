import express from "express";
import cors from "cors";

import applicationRoutes from "./routes/applicationRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

const app = express();

// Check if running in production environment
// Needed to apply stricter CORS policies in production
// while allowing flexibility in development for faster iteration
const isProduction = process.env.NODE_ENV === "production";

// Parse allowed origins from environment variable
// Security best practice - never hardcode origins
// This allows deployment-specific configuration without changing code
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);

// CORS configuration object
// Prevents unauthorized cross-origin requests
// which protects against CSRF attacks and unauthorized API access
const corsOptions = {
  origin: function (origin, callback) {
    // In development: allow all origins for local testing convenience
    // Eliminates CORS headaches during development
    // when frontend might be served from different ports
    if (!isProduction) {
      return callback(null, true);
    }

    // In production: enforce strict CORS policy
    // Mobile apps and server-side requests don't send
    // Origin header, so we allow them to prevent breaking legitimate requests
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in the whitelist of allowed origins
    // Only explicitly approved domains can access the API
    // This prevents malicious websites from making unauthorized requests
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Reject requests from unknown origins
    // Blocks potential security threats from unauthorized domains
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/applications", applicationRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

export default app;
