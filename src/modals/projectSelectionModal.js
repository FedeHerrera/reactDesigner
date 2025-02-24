import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectSelectionModal({ projects, onClose }) {
  const navigate = useNavigate();

  const handleProjectSelect = (projectName) => {
    onClose(); // Close the modal first
    navigate(`/project/${projectName}`); // Navigate to the project view
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-3/5 bg-background border border-border rounded-lg p-8 relative">
        <h2 className="text-4xl text-primary font-techno text-center mb-6">Selecciona un Proyecto</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project}
              className="p-4 bg-border text-primary border border-primary rounded-lg cursor-pointer hover:bg-primary_hover hover:text-background"
              onClick={() => handleProjectSelect(project)}
            >
              {project}
            </li>
          ))}
        </ul>
        <button
          className="absolute top-4 right-4 px-4 py-2 bg-border text-text rounded hover:bg-primary_hover"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
