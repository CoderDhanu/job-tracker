import Application from "../models/application.js";
import recommendationService from "../services/recommendationService.js";
const {
  extractSkillFrequency,
  getTopSkills,
  recommendRoles,
  calculateConfidence,
} = recommendationService;

/**
 * Generates job application recommendations based on existing applications.
 *
 * Retrieves all applications, analyzes skill frequency, determines top skills,
 * recommends roles, and calculates a confidence score. Responds with the
 * recommendations as JSON.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} Sends a JSON response with top skills, recommended roles, and confidence score.
 */
const getRecommendations = async (req, res) => {
  try {
    const applications = await Application.find();

    const skillFrequency = extractSkillFrequency(applications);
    const topSkills = getTopSkills(skillFrequency);
    const roles = recommendRoles(applications);
    const confidenceScore = calculateConfidence(applications);

    res.json({
      topSkills,
      recommendedRoles: roles,
      confidenceScore,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate recommendations" });
  }
};

export { getRecommendations };
