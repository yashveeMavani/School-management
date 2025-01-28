const Attendance = require("../models/attendance.model");

// Record Attendance
exports.recordAttendance = async (req, res) => {
  const { studentId, classId, date, status } = req.body;

  try {
    const attendance = await Attendance.create({ studentId, classId, date, status });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get All Attendance Records
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll();
    res.json(attendance);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Attendance by Class
exports.getAttendanceByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const attendance = await Attendance.findAll({ where: { classId } });
    res.json(attendance);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Attendance by Student
exports.getAttendanceByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const attendance = await Attendance.findAll({ where: { studentId } });
    res.json(attendance);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
