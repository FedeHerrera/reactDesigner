export const getTemplates = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/templates/list");
      const data = await response.json();
      return data.templates|| [];
    } catch (error) {
      console.error("Failed to fetch templates", error);
      return [];
    }
  };