require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const teacherRoutes = require("./routes/teacher.routes");
const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");
const subjectRoutes = require("./routes/subject.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const gradeRoutes = require("./routes/grade.routes");
const notificationRoutes = require("./routes/notification.routes");
const reportRoutes = require("./routes/report.routes");


const app = express();
const PORT = process.env.PORT || 3300;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);

sequelize
  .sync({ alter: true }) 
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Unable to sync database:", err));