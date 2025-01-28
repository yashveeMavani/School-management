const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const { verifyRole } = require("../middleware/rbac.middleware");

router.post("/attendance", verifyRole(["teacher", "admin"]), notificationController.notifyAttendance);
router.post("/grades", verifyRole(["teacher", "admin"]), notificationController.notifyGrades);

module.exports = router;
