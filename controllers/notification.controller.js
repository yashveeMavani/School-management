const nodemailer = require("nodemailer");
const Attendance = require("../models/attendance.model");
const Grade = require("../models/grade.model");

// Simulate sending email notifications
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Notify Parents about Attendance
exports.notifyAttendance = async (req, res) => {
  const { email, attendanceId } = req.body;

  const attendance = await Attendance.findByPk(attendanceId);
console.log(attendance);
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Attendance Notification",

      text: `Your child has been marked ${attendance.status} on ${attendance.date}.`,
    });

    res.send("Attendance notification sent");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Notify Parents about Grades
exports.notifyGrades = async (req, res) => {

  const { email, gradesId } = req.body;

  const grades = await Grade.findByPk(gradesId)

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Grade Notification",
      text: `Your child has received the following grades: ${JSON.stringify(grades)}`,
    });

    res.send("Grade notification sent");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
