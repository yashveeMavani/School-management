const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");
const { verifyToken} = require("../middleware/auth.middleware");


router.post("/create", [verifyToken], classController.createClass);
router.get("/", [verifyToken], classController.getAllClasses);
router.get("/:classId", [verifyToken], classController.getClassById);
router.post("/assign-teacher", [verifyToken], classController.assignTeacherToClassAndSubject);
router.post("/assign-subject", [verifyToken], classController.assignSubjectToClass);


module.exports = router;