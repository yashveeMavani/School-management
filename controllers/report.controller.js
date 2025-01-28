const db = require("../models");
const { Op } = require("sequelize");
const Grade = require("../models/grade.model");
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");
const Class = require("../models/class.model");
const Student = require("../models/student.model");

// Performance report for the entire school
exports.getSchoolPerformanceReport = async (req, res) => {
  try {
    const students = await User.findAll({ where: { role: "student" } });

    const studentIds = students.map((student) => student.id);

    // Fetch grades for all students
    const grades = await Grade.findAll({
      where: {
        studentId: { [Op.in]: studentIds },
      },
    });

    // Fetch attendance for all students
    const attendance = await Attendance.findAll({
      where: {
        studentId: { [Op.in]: studentIds },
      },
    });

    // You can aggregate or transform the data as needed, e.g., calculate averages
    res.json({ students, grades, attendance });
  } catch (error) {
    res.status(500).send("Error generating report: " + error.message);
  }
};

// Performance report for a specific class
exports.getClassPerformanceReport = async (req, res) => {
  const { classId } = req.params;

  try {
    const students = await User.findAll({
      where: { role: "student" },
      include: {
        model: Class,
        where: { id: classId },
      },
    });

    const studentIds = students.map((student) => student.id);

    // Fetch grades for students in the class
    const grades = await Grade.findAll({
      where: {
        studentId: { [Op.in]: studentIds },
      },
    });

    // Fetch attendance for students in the class
    const attendance = await Attendance.findAll({
      where: {
        studentId: { [Op.in]: studentIds },
        classId,
      },
    });

    res.json({ students, grades, attendance });
  } catch (error) {
    res.status(500).send("Error generating report: " + error.message);
  }
};

// Performance report for an individual student
exports.getStudentPerformanceReport = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Fetch the student’s grades
    const grades = await Grade.findAll({
      where: {
        studentId,
      },
    });

    // Fetch the student's attendance
    const attendance = await Attendance.findAll({
      where: {
        studentId,
      },
    });

    res.json({ grades, attendance });
  } catch (error) {
    res.status(500).send("Error generating report: " + error.message);
  }
};

