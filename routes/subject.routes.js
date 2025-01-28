const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Define routes for subject management
router.post("/create", [verifyToken], subjectController.createSubject);
router.get("/", [verifyToken], subjectController.getAllSubjects);
router.get("/:subjectId", [verifyToken], subjectController.getSubjectById);

module.exports = router;