export const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects/list");
      const data = await response.json();
      return data.projects || [];
    } catch (error) {
      console.error("Failed to fetch projects", error);
      return [];
    }
  };
  
  export const createProject = async (projectName, templateName) => {
    try {
      const response = await fetch("http://localhost:5000/api/projects/create-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectName, templateName }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      return { error: error.message };
    }
  };