const Subject  = require('../models/subject.model');

exports.createSubject = async (req, res) => {
  const { name } = req.body;

  try {
    const newSubject = await Subject.create({ name });
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getSubjectById = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const subjectData = await Subject.findByPk(subjectId);
    if (!subjectData) return res.status(404).send("Subject not found");
    res.status(200).json(subjectData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};