import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCreationModal from "../modals/projectCreationModal";

export default function ProjectSelection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Select or Create a Project</h1>
      <button
        className={`px-4 py-2 rounded bg-blue-500 text-white ${projects.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        disabled={projects.length === 0}
      >
        Select a Project
      </button>
      <button
        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
        onClick={() => setIsModalOpen(true)}
      >
        Start a New Project
      </button>

      {isModalOpen && <ProjectCreationModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
