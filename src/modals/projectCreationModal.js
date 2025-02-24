import { useEffect, useState } from "react";
import { getTemplates } from "../services/templateService";
import { createProject } from "../services/projectService";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectCreationModal({ onClose }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getTemplates();
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  const handleCreate = async () => {
    const result = await createProject(projectName, selectedTemplate);
    if (!result.error) {
      alert(`Proyecto '${projectName}' creado con plantilla: ${selectedTemplate}`);
      onClose();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-4/5 h-4/5 bg-background border border-border rounded-lg p-8 pt-12 relative flex flex-col items-center justify-start">
        <h1 className="text-6xl text-primary mb-10 font-techno text-center">Plantilla</h1>

        <select
          className="w-1/2 p-2 border-2 border-primary_hover bg-border text-text rounded mb-20"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Selecciona una plantilla</option>
          {templates.map((template) => (
            <option key={template} value={template}>
              {template}
            </option>
          ))}
        </select>

        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <h2 className="text-5xl text-primary font-techno mb-4">Nombre</h2>
              <input
                type="text"
                className="w-1/2 p-2 border-2 border-primary_hover bg-border text-text rounded mb-20"
                placeholder="Nombre del proyecto"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />

              {projectName && (
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="px-10 py-3 bg-primary text-background rounded font-techno hover:bg-primary_hover"
                  onClick={handleCreate}
                >
                  Crear
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
