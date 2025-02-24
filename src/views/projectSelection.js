import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCreationModal from "../modals/projectCreationModal";
import ProjectSelectionModal from "../modals/projectSelectionModal";

export default function ProjectSelection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleProjectSelect = (projectName) => {
    setIsProjectListOpen(false); // Close the modal
  };

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-5xl text-primary font-techno mb-12">WebDesigner</h1>

      <div className="flex gap-12 justify-center w-full">
        {/* Select Project Box */}
        <div
          className={`w-[40%] h-[70vh] bg-border border-4 border-primary flex items-center justify-center cursor-pointer hover:text-primary_hover ${projects.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:border-primary_hover"}`}
          onClick={() => projects.length > 0 && setIsProjectListOpen(true)}
        >
          <h2 className="text-4xl text-primary font-techno text-center">Seleccionar Proyecto</h2>
        </div>

        {/* New Project Box */}
        <div
          className="w-[40%] h-[70vh] bg-border border-4 border-primary flex items-center justify-center cursor-pointer hover:text-primary_hover hover:border-primary_hover"
          onClick={() => setIsModalOpen(true)}
        >
          <h2 className="text-4xl text-primary font-techno text-center">Nuevo Proyecto</h2>
        </div>
      </div>

      {isModalOpen && <ProjectCreationModal onClose={() => setIsModalOpen(false)} />}

      {isProjectListOpen && (
        <ProjectSelectionModal
          projects={projects}
          onSelect={handleProjectSelect}
          onClose={() => setIsProjectListOpen(false)}
        />
      )}
    </div>
  );
}
