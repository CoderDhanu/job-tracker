import { useEffect, useState } from "react";
import { fetchApplications } from "../api/applications";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications().then((response) => {
      setApplications(response.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {applications.map((app) => (
          <div key={app._id} className="rounded-lg border p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{app.company}</h2>
              <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">{app.status || "Unknown"}</span>
            </div>
            <p className="text-sm text-gray-700 mb-1">Role: {app.role}</p>
            {app.location && (
              <p className="text-sm text-gray-600 mb-1">Location: {app.location}</p>
            )}
            {app.jobDescription && (
              <p className="text-sm text-gray-600 line-clamp-2">{app.jobDescription}</p>
            )}
            {Array.isArray(app.skills) && app.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {app.skills.map((skill, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
