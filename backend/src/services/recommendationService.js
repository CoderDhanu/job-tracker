/**
 * Extracts and counts the frequency of skills from a list of job applications.
 *
 * @param {Object[]} applications - Array of application objects to analyze
 * @param {string[]} applications[].skills - Array of skill strings for each application
 * @returns {Object} An object where keys are skill names and values are their occurrence counts
 *
 * @example
 * const apps = [
 *   { skills: ['JavaScript', 'React'] },
 *   { skills: ['JavaScript', 'Node.js'] }
 * ];
 * const frequency = extractSkillFrequency(apps);
 * // Returns: { JavaScript: 2, React: 1, 'Node.js': 1 }
 */
const extractSkillFrequency = (applications) => {
  const skillCount = {};

  applications.forEach((application) => {
    application.skills.forEach((skill) => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });

  return skillCount;
};

/**
 * Extracts the top skills from a skill count object.
 * @param {Object} skillCount - An object where keys are skill names and values are their occurrence counts.
 * @param {number} [limit=5] - The maximum number of top skills to return. Defaults to 5.
 * @returns {string[]} An array of skill names sorted by frequency in descending order, limited to the specified count.
 */
const getTopSkills = (skillCount, limit = 5) => {
  return Object.entries(skillCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([skill]) => skill);
};

const recommendRoles = (applications) => {
  const roleCount = {};

  applications.forEach((application) => {
    const role = application.role;
    roleCount[role] = (roleCount[role] || 0) + 1;
  });

  return Object.entries(roleCount)
    .sort((a, b) => b[1] - a[1])
    .map(([role]) => role)
    .slice(0, 3);
};

const calculateConfidence = (applications) => {
  if (applications.length === 0) return 0;

  const skillCount = extractSkillFrequency(applications);
  const uniqueSkills = Object.keys(skillCount).length;

  return Math.min(1, uniqueSkills / 10).toFixed(2);
};

export default {
  extractSkillFrequency,
  getTopSkills,
  recommendRoles,
  calculateConfidence,
};
