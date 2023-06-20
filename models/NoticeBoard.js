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
});

module.exports = noticeBoard;
