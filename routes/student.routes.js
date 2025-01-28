const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

router.post("/create", [verifyToken], studentController.createStudent);
router.get("/", [verifyToken], studentController.getStudents);
router.put("/update/:id", [verifyToken], studentController.updateStudent);
router.delete("/:id", [verifyToken], studentController.deleteStudent);

module.exports = router;