const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const userController = require("../controllers/user.controller"); 
const { verifyToken, verifyRole } = require("../middleware/auth.middleware");

// School Performance Report
router.get("/school", verifyRole(["admin", "teacher"]), reportController.getSchoolPerformanceReport);

// Class Performance Report
router.get("/class/:classId", verifyRole(["admin", "teacher"]), reportController.getClassPerformanceReport);

// Student Performance Report
router.get("/student/:studentId", verifyRole(["admin", "teacher"]), reportController.getStudentPerformanceReport);

router.get("/profile", verifyToken, userController.getUserProfile);

module.exports = router;


