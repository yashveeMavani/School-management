const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Class = sequelize.define("Class", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Teacher = require("./teacher.model");
const Subject = require("./subject.model");

const ClassTeachers = sequelize.define("ClassTeachers", {
  ClassId: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  TeacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: Teacher,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});

const ClassSubjects = sequelize.define("ClassSubjects", {
  ClassId: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  SubjectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Subject,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});

Class.belongsToMany(Teacher, { through: ClassTeachers, foreignKey: "ClassId", otherKey: "TeacherId" });
Teacher.belongsToMany(Class, { through: ClassTeachers, foreignKey: "TeacherId", otherKey: "ClassId" });

Class.belongsToMany(Subject, { through: ClassSubjects, foreignKey: "ClassId", otherKey: "SubjectId" });
Subject.belongsToMany(Class, { through: ClassSubjects, foreignKey: "SubjectId", otherKey: "ClassId" });

module.exports = Class;