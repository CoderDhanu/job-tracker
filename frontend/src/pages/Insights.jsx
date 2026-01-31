import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import Tags from "../components/Tags";
import Tooltip from "../components/Tooltip";
import Chips from "../components/Chips";

const Insights = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getScoreTagClass = (score) => {
    if (score == null || score === "—" || Number.isNaN(Number(score))) {
      return "text-gray-700 bg-gray-100 border border-gray-400";
    }

    const numericScore = Number(score);

    if (numericScore >= 0.8)
      return "text-green-700 bg-green-50 border border-green-400";
    if (numericScore >= 0.6)
      return "text-amber-700 bg-amber-50 border border-amber-400";
    return "text-red-700 bg-red-50 border border-red-400";
  };

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/recommendations")
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching insights:", error);
        setError("Unable to load insights. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-56 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-40 bg-white rounded-xl border border-gray-100"></div>
              <div className="h-40 bg-white rounded-xl border border-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold text-gray-900">
              AI Career Insights
            </h2>
            <div className="text-gray-600">
              A quick, clean snapshot of your application trends.
            </div>
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate("/")}
            aria-label="Back to dashboard"
          >
            <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            Dashboard
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-start text-gray-500">
                Confidence Score
              </div>
              <Tooltip text="Score ranges from 0 to 1" />
            </div>
            <div className="mt-3 text-start">
              <Tags
                label={data.confidenceScore ?? "—"}
                className={`text-2xl px-4 py-2 ${getScoreTagClass(
                  data.confidenceScore,
                )}`}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm md:col-span-2">
            <div className="text-sm font-semibold text-start text-gray-500">
              Top Skills
            </div>
            <div className="mt-3">
              <Chips
                skills={data.topSkills}
                emptyText="No skills found"
                variant="default"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="text-sm font-semibold text-start text-gray-500">
            Recommended Roles
          </div>
          <div className="mt-3">
            <Chips
              skills={data.recommendedRoles}
              emptyText="No roles recommended"
              variant="alternative"
              containerClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
