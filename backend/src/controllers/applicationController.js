import Application from "../models/application.js";
import mongoose from "mongoose";

/**
 * Validates if a given string is a valid MongoDB ObjectId
 * @param {string} id - The ID to validate
 * @returns {boolean} True if the ID is a valid MongoDB ObjectId, false otherwise
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Sanitizes and filters request body to only include allowed application fields
 * @param {Object} body - The request body object containing application data
 * @param {string} [body.company] - The company name
 * @param {string} [body.role] - The job role/position
 * @param {string} [body.location] - The job location
 * @param {string} [body.jobDescription] - The job description
 * @param {string} [body.status] - The application status
 * @param {Array} [body.skills] - Array of required skills
 * @returns {Object} Sanitized object containing only allowed fields and non-null values
 */
const sanitizeApplicationFields = (body) => {
  const allowedFields = {
    company: body.company,
    role: body.role,
    location: body.location,
    jobDescription: body.jobDescription,
    status: body.status,
    skills: body.skills,
  };

  // Remove undefined and null fields
  Object.keys(allowedFields).forEach(
    (key) => allowedFields[key] == null && delete allowedFields[key],
  );

  return allowedFields;
};

/**
 * Creates a new job application
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing application data
 * @param {string} req.body.company - Company name (required)
 * @param {string} req.body.role - Job role/position (required)
 * @param {string} [req.body.location] - Job location
 * @param {string} [req.body.jobDescription] - Job description
 * @param {string} [req.body.status] - Application status
 * @param {Array} [req.body.skills] - Required skills
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with created application or error message
 */
const createApplication = async (req, res) => {
  try {
    // Validate required fields
    const { company, role } = req.body;

    if (
      !company ||
      typeof company !== "string" ||
      !company.trim() ||
      !role ||
      typeof role !== "string" ||
      !role.trim()
    ) {
      return res.status(400).json({
        message: "Validation failed: company and role are required fields",
      });
    }

    // Sanitize input - only allow expected fields
    const allowedFields = sanitizeApplicationFields(req.body);

    const application = await Application.create(allowedFields);
    res.status(201).json(application);
  } catch (error) {
    // Provide user-friendly error messages for validation failures
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Failed to create application: validation failed",
        errors: messages,
      });
    }
    res.status(400).json({ message: "Failed to create application" });
  }
};

/**
 * Retrieves all job applications sorted by creation date (newest first)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with array of all applications or error message
 */
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates an existing job application by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The MongoDB ID of the application to update
 * @param {Object} req.body - Request body containing fields to update
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with updated application or error message
 * @throws {400} If the ID format is invalid or update fails
 * @throws {404} If application with given ID is not found
 */
const updateApplication = async (req, res) => {
  try {
    // Validate ID format
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID format" });
    }

    // Sanitize input - only allow expected fields
    const allowedFields = sanitizeApplicationFields(req.body);

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Deletes a job application by ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The MongoDB ID of the application to delete
 * @param {Object} res - Express response object
 * @returns {void} Sends JSON response with success message or error message
 * @throws {400} If the ID format is invalid
 * @throws {404} If application with given ID is not found
 */
const deleteApplication = async (req, res) => {
  try {
    // Validate ID format
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid application ID format" });
    }

    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
};
