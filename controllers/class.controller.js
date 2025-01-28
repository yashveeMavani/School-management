const Class = require("../models/class.model");
const Teacher = require("../models/teacher.model");
const Subject = require("../models/subject.model");

exports.createClass = async (req, res) => {
  const { name } = req.body;

  try {
    const newClass = await Class.create({ name });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll(
      {
        include: {
          model: Subject,
          through: { attributes: [] },
        },
      }
    );
    res.status(200).json(classes);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }

};

exports.getClassById = async (req, res) => {
  const { classId } = req.params;

  try {
    const classData = await Class.findByPk(classId, {
      include: [Teacher, Subject],
    });
    if (!classData) return res.status(404).send("Class not found");
    res.status(200).json(classData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.assignTeacherToClassAndSubject = async (req, res) => {
  const { classId, teacherId, subjectId } = req.body;
 

  try {
    const classData = await Class.findByPk(classId);
    const teacher = await Teacher.findByPk(teacherId);
    const subject = await Subject.findByPk(subjectId);
    if (!classData || !teacher || !subject)
      return res.status(404).send("Class, Teacher, or Subject not found");

    await classData.addTeacher(teacher);
    await classData.addSubject(subject);
    res.status(200).send("Teacher and Subject assigned to class");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.assignSubjectToClass = async (req, res) => {
  const { classId, subjectId } = req.body;

  try {
    const classData = await Class.findByPk(classId);
    const subject = await Subject.findByPk(subjectId);
    if (!classData || !subject)
      return res.status(404).send("Class or Subject not found");

    await classData.addSubject(subject);
    res.status(200).send("Subject assigned to class");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
