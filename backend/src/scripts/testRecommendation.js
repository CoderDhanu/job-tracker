import recommendationService from "../services/recommendationService.js";

const mockApplications = [
  { skills: ["Vue", "JavaScript", "Tailwind", "Node.js"] },
  { skills: ["React", "TypeScript"] },
  { skills: ["JavaScript", "Node.js"] },
];

const freq = recommendationService.extractSkillFrequency(mockApplications);
console.log("freq", freq);

const topSkills = recommendationService.getTopSkills(freq);
console.log("Top skills:", topSkills);
