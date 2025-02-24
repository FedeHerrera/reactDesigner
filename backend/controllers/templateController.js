const fs = require("fs");
const path = require("path");


exports.listTemplates = (req, res) => {
    const templatesPath = path.join(__dirname, "../templates");

    try {
        if (!fs.existsSync(templatesPath)) {
            fs.mkdirSync(templatesPath, { recursive: true }); 
        }

        const templates = fs.readdirSync(templatesPath).filter((file) => {
            return fs.statSync(path.join(templatesPath, file)).isDirectory();
        });

        res.status(200).json({ templates });
    } catch (error) {
        console.error("Error listing templates:", error);
        res.status(500).json({ error: "Failed to list templates" });
    }
};

