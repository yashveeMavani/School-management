const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Grade = sequelize.define("Grade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  grade: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Grade;
