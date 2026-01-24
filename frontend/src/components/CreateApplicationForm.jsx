import { useState, useEffect } from "react";
import Button from "./Button";
import InputField from "./InputField";
import InputSelect from "./InputSelect";
import { faUser, faBriefcase, faMapMarkerAlt, faFileAlt, faCode } from "@fortawesome/free-solid-svg-icons";

export default function CreateApplicationForm({ onSubmit, onCancel, loading = false, initialData = null }) {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    role: initialData?.role || "",
    location: initialData?.location || "",
    jobDescription: initialData?.jobDescription || "",
    status: initialData?.status || "Applied",
    skills: initialData?.skills || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Job role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert skills string to array
    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    onSubmit({
      company: formData.company,
      role: formData.role,
      location: formData.location,
      jobDescription: formData.jobDescription,
      status: formData.status,
      skills: skillsArray,
    });
  };

  const statusOptions = [
    "Applied",
    "Interviewing",
    "Offered",
    "Rejected",
    "Accepted",
    "Withdrawn",
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Company */}
      <InputField
        label="Company Name"
        id="company"
        name="company"
        type="text"
        value={formData.company}
        onChange={handleChange}
        placeholder="e.g, Google, Microsoft"
        error={errors.company}
        required
        icon={faUser}
      />

      {/* Role */}
      <InputField
        label="Job Role"
        id="role"
        name="role"
        type="text"
        value={formData.role}
        onChange={handleChange}
        placeholder="e.g, Frontend Engineer, Product Manager"
        error={errors.role}
        required
        icon={faBriefcase}
      />

      {/* Location */}
      <InputField
        label="Location"
        id="location"
        name="location"
        type="text"
        value={formData.location}
        onChange={handleChange}
        placeholder="e.g, Remote, Chennai, Tamil Nadu"
        icon={faMapMarkerAlt}
      />

      {/* Job Description */}
      <InputField
        label="Job Description"
        id="jobDescription"
        name="jobDescription"
        type="textarea"
        value={formData.jobDescription}
        onChange={handleChange}
        placeholder="Paste the job description or any other key details."
        icon={faFileAlt}
      />

      {/* Status */}
      <InputSelect
        label="Application Status"
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={statusOptions}
      />

      {/* Skills */}
      <InputField
        label="Required Skills"
        id="skills"
        name="skills"
        type="text"
        value={formData.skills}
        onChange={handleChange}
        placeholder="e.g, React, JavaScript, Python"
        icon={faCode}
      />
      {/* <p className="text-gray-500 text-xs">(comma-separated)</p> */}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          className="flex-1"
        >
          {initialData ? "Update Application" : "Create Application"}
        </Button>
      </div>
    </form>
  );
}
