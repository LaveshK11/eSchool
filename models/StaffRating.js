const { sequelize, DataTypes } = require("../connection");
const Staff = require("./Staff");
const users = require("./User");

const StaffRating = sequelize.define("staff_rating", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  applicatiion_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// StaffRating.belongsTo(Staff, {
//   foreignKey: "staff_id",
//   targetKey: "id",
//   onDelete: null,
// });

// StaffRating.belongsTo(users, {
//   foreignKey: "user_id",
//   targetKey: "id",
//   onDelete: null,
// });

// StaffRating.sync({ alter: true });

module.exports = StaffRating;
