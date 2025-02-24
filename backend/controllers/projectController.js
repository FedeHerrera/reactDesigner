const fs = require("fs");
const path = require("path");

exports.createProject = (req, res) => {
    const { projectName, templateName = "default" } = req.body;

    if (!projectName) {
        return res.status(400).json({ error: "Project name is required" });
    }

    const templatePath = path.join(__dirname, "../templates", templateName);
    if (!fs.existsSync(templatePath)) {
        return res.status(400).json({ error: `Template '${templateName}' not found` });
    }

    const projectPath = path.join(__dirname, "../projects", projectName);
    if (fs.existsSync(projectPath)) {
        return res.status(400).json({ error: "Project already exists" });
    }

    try {
        fs.mkdirSync(projectPath, { recursive: true });
        fs.cpSync(templatePath, projectPath, { recursive: true });

        res.status(201).json({ message: `Project '${projectName}' created successfully using '${templateName}' template!` });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};

exports.listProjects = (req, res) => {
    const projectsPath = path.join(__dirname, "../projects");

    try {
        // Check if the directory exists
        if (!fs.existsSync(projectsPath)) {
            fs.mkdirSync(projectsPath, { recursive: true }); // Create if it doesn't exist
        }

        // Read the contents of the projects directory
        const projects = fs.readdirSync(projectsPath).filter((file) => {
            // Ensure we only include directories (i.e., actual projects)
            return fs.statSync(path.join(projectsPath, file)).isDirectory();
        });

        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error listing projects:", error);
        res.status(500).json({ error: "Failed to list projects" });
    }
};

exports.listProjects = (req, res) => {
    const projectsPath = path.join(__dirname, "../projects");

    try {
        // Check if the directory exists
        if (!fs.existsSync(projectsPath)) {
            fs.mkdirSync(projectsPath, { recursive: true }); // Create if it doesn't exist
        }

        // Read the contents of the projects directory
        const projects = fs.readdirSync(projectsPath).filter((file) => {
            // Ensure we only include directories (i.e., actual projects)
            return fs.statSync(path.join(projectsPath, file)).isDirectory();
        });

        res.status(200).json({ projects });
    } catch (error) {
        console.error("Error listing projects:", error);
        res.status(500).json({ error: "Failed to list projects" });
    }
};
