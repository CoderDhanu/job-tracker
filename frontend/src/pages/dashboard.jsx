import { useEffect, useState } from "react";
import { fetchApplications, deleteApplication, createApplication as createApplicationAPI, updateApplication } from "../api/applications";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import CreateApplicationForm from "../components/CreateApplicationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // Fetch applications on mount
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchApplications();
      setApplications(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const app = applications.find((a) => a._id === id);
    if (app) {
      setEditingApp(app);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteApplication(id);
        setApplications(applications.filter((app) => app._id !== id));
        alert("Application deleted successfully!");
      } catch (err) {
        alert("Failed to delete application. Please try again.");
        console.error(err);
      }
    }
  };

  const handleCreateApplication = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const response = await createApplicationAPI(formData);
      setApplications([response.data, ...applications]);
      setIsModalOpen(false);
      alert("Application created successfully!");
    } catch (err) {
      alert("Failed to create application. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingApp(null);
  };

  const handleEditFormSubmit = async (formData) => {
    if (!editingApp) return;

    try {
      setIsSubmitting(true);
      const response = await updateApplication(editingApp._id, formData);
      setApplications(
        applications.map((app) => (app._id === editingApp._id ? response.data : app))
      );
      setIsEditModalOpen(false);
      setEditingApp(null);
      alert("Application updated successfully!");
    } catch (err) {
      alert("Failed to update application. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex">
          <div className="mb-8 justify-items-start">
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-2">Track and manage your job applications</p>
          </div>
          <div className="ml-auto">
            <Button variant="primary" size="md" onClick={handleCreateApplication}>
              Create Application
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
            <Button
              variant="danger"
              size="md"
              onClick={loadApplications}
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && applications.length === 0 && (
          <div className="text-center py-12">
            <div className="flex justify-center gap-3 text-gray-900">
              <FontAwesomeIcon
                icon={faClipboardList}
                className="self-center"
              />
              <h3 className="text-lg font-medium">No applications yet</h3>
            </div>
            <p className="text-gray-600">Start tracking your job applications to get started!</p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <Card
                key={app._id}
                app={app}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create New Application"
        size="lg"
      >
        <CreateApplicationForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
          loading={isSubmitting}
        />
      </Modal>

      {/* Edit Application Modal */}
      {editingApp && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title="Edit Application"
          size="lg"
        >
          <CreateApplicationForm
            initialData={{
              company: editingApp.company,
              role: editingApp.role,
              location: editingApp.location,
              jobDescription: editingApp.jobDescription,
              status: editingApp.status,
              skills: editingApp.skills?.join(", ") || "",
            }}
            onSubmit={handleEditFormSubmit}
            onCancel={handleCloseEditModal}
            loading={isSubmitting}
          />
        </Modal>
      )}
    </div>
  );
}
