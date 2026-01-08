const Application = require("../models/application");

// Helper function to sanitize input fields
const sanitizeApplicationFields = (body) => {
  const allowedFields = {
    company: body.company,
    role: body.role,
    location: body.location,
    jobDescription: body.jobDescription,
    status: body.status,
    skills: body.skills
  };

  // Remove undefined fields
  Object.keys(allowedFields).forEach(key => 
    allowedFields[key] === undefined && delete allowedFields[key]
  );

  return allowedFields;
};

// create application
const createApplication = async (req, res) => {
  try {
    // Validate required fields
    const { company, role } = req.body;
    
    if (!company?.trim() || !role?.trim()) {
      return res.status(400).json({ 
        message: "Validation failed: company and role are required fields" 
      });
    }

    // Sanitize input - only allow expected fields
    const allowedFields = sanitizeApplicationFields(req.body);

    const application = await Application.create(allowedFields);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update application
const updateApplication = async (req, res) => {
  try {
    // Sanitize input - only allow expected fields
    const allowedFields = sanitizeApplicationFields(req.body);

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      allowedFields,
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete application
const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
};
