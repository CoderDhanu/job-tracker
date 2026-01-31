import { useEffect, useState } from "react";
import axios from "axios";

const Insights = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/recommendations")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching insights:", error);
      });
  }, []);

  if (!data) return <p>Loading insights...</p>;

  return (
    <div>
      <h2>AI Career Insights</h2>

      <h3>Top Skills</h3>
      <ul>
        {data.topSkills?.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3>Recommended Roles</h3>
      <ul>
        {data.recommendedRoles?.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>

      <p>
        Confidence Score: <strong>{data.confidenceScore}</strong>
      </p>
    </div>
  );
};

export default Insights;
