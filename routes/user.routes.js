const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken, verifyRole } = require("../middleware/auth.middleware");

router.get("/profile", verifyToken, userController.getUserProfile);
router.post("/login", userController.login);
router.post("/create", verifyRole(["admin"]), userController.createUser);
router.put("/update/:id", verifyRole(["admin"]), userController.updateUser);
router.delete("/delete/:id", verifyRole(["admin"]), userController.deleteUser);


module.exports = router;