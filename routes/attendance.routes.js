const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const { verifyRole } = require("../middleware/rbac.middleware");

// Only teachers and admins can manage attendance
router.post("/", verifyRole(["teacher", "admin"]), attendanceController.recordAttendance);
router.get("/", verifyRole(["teacher", "admin", "student"]), attendanceController.getAttendance);
router.get("/class/:classId", verifyRole(["teacher", "admin"]), attendanceController.getAttendanceByClass);
router.get("/student/:studentId", verifyRole(["teacher", "admin", "student"]), attendanceController.getAttendanceByStudent);

module.exports = router;
