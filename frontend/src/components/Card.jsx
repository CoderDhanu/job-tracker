import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Card({ app, onEdit, onDelete }) {
  // Status color mapping
  const statusColorMap = {
    Applied: "bg-blue-100 text-blue-700",
    Interviewing: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Offered: "bg-green-100 text-green-700",
    Accepted: "bg-green-100 text-green-700",
    Withdrawn: "bg-gray-100 text-gray-700",
  };

  const statusColor = statusColorMap[app.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="rounded-lg border border-gray-200 p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header: Company and Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col gap-2 text-start">
          <h2 className="text-lg font-bold text-gray-900">{app.company}</h2>
          <p className="text-sm font-medium text-gray-600">{app.role}</p>

          {/* Location */}
          {app.location && (
            <div className="flex items-center text-sm text-gray-600">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="w-4 h-4 mr-1.5"
              />
              {app.location}
            </div>
          )}

          {/* Job Description */}
          {app.jobDescription && (
            <p className="text-sm text-gray-600 mb-3">
              {app.jobDescription}
            </p>
          )}
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-md whitespace-nowrap ${statusColor}`}
        >
          {app.status || "Unknown"}
        </span>
      </div>

      {/* Skills */}
      {Array.isArray(app.skills) && app.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {app.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="text-xs text-gray-500 mb-3 pt-3 border-t border-gray-100">
        <p>
          Created: {new Date(app.createdAt).toLocaleDateString()}
          {app.updatedAt !== app.createdAt && (
            <>
              <br />
              Updated: {new Date(app.updatedAt).toLocaleDateString()}
            </>
          )}
        </p>
      </div>

      {/* Action Buttons */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          {onEdit && (
            <Button
              variant="outline"
              size="md"
              onClick={() => onEdit(app._id)}
              className="flex-1"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger_outline"
              size="md"
              onClick={() => onDelete(app._id)}
              className="flex-1"
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
