const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Attendance = sequelize.define("Attendance", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM("present", "absent"), allowNull: false },
});

module.exports = Attendance;

