import Application from "../models/application.js";
import recommendationService from "../services/recommendationService.js";
const {
  extractSkillFrequency,
  getTopSkills,
  recommendRoles,
  calculateConfidence,
} = recommendationService;

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
