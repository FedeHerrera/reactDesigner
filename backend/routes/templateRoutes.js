const express = require("express");
const { listTemplates } = require("../controllers/templateController");

const router = express.Router();

router.get("/list", listTemplates);

module.exports = router;
