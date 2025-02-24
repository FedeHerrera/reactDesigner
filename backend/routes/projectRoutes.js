const express = require("express");
const { createProject, listProjects } = require("../controllers/projectController");

const router = express.Router();

router.post("/create-project", createProject);
router.get("/list", listProjects);

module.exports = router;
