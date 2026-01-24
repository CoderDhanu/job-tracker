const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Interviewing",
        "Offered",
        "Rejected",
        "Accepted",
        "Withdrawn",
      ],
      default: "Applied",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
