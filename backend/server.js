const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const templateRoutes = require("./routes/templateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Use project routes
app.use("/api/projects", projectRoutes);
app.use("/api/templates", templateRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
