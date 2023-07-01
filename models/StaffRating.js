const { sequelize, DataTypes } = require("../connection");

const StaffRating = sequelize.define("staff_ratings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  staff_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "staffs",
      key: "id",
    },
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: "users",
    //   key: "id",
    // },
  },
  applicatiion_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING'
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StaffRating;
