const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");
const teacherController = require("../controllers/teacher.controller");

router.post("/create", teacherController.createTeacher);
router.post("/", [verifyToken], teacherController.createTeacher);
router.get("/", [verifyToken], teacherController.getTeachers);
router.put("/update/:id", [verifyToken], teacherController.updateTeacher);
router.delete("/:id", [verifyToken], teacherController.deleteTeacher);

module.exports = router;