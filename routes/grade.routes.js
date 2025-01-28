const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/grade.controller");
const { verifyRole } = require("../middleware/rbac.middleware");

router.post("/", verifyRole(["teacher", "admin"]), gradeController.addGrade);
router.get("/", verifyRole(["teacher", "admin", "student"]), gradeController.getGrades);
router.get("/student/:studentId", verifyRole(["teacher", "admin", "student"]), gradeController.getGradesByStudent);

module.exports = router;
