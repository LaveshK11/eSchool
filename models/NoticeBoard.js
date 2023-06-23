const { sequelize, DataTypes } = require("../connection");

const noticeBoard = sequelize.define("notice_board", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  issue_date: {
    type: DataTypes.DATE,
    allowNull: false,

  },
  Parent: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null

  },
  student: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  Accountant: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  Librarian: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  Admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  Receptionist: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  Teacher: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  Super_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
});

module.exports = noticeBoard;
