const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const outputController = require("../controllers/output.controller");


router.get('/submission/:submissionId/outputs', authMiddleware, outputController.getSubmissionOutputs);

module.exports = router;