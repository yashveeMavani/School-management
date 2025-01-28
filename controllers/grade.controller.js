const Grade = require("../models/grade.model");

// Add Grade
exports.addGrade = async (req, res) => {
  const { studentId, subject, grade } = req.body;

  try {
    const newGrade = await Grade.create({ studentId, subject, grade });
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get All Grades
exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Grades by Student
exports.getGradesByStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const grades = await Grade.findAll({ where: { studentId } });
    res.json(grades);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
