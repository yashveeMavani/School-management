const  Student  = require('../models/student.model');

exports.createStudent = async (req, res) => {
  const { name, email } = req.body;

  try {
    const student = await Student.create({ name, email });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).send("Student not found");

    student.name = name;
    student.email = email;
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).send("Student not found");

    await student.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};