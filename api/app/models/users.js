const { Model, DataTypes, Sequelize } = require("sequelize");
const moment = require("moment");

const USER_TABLE = "users";
const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: "deleted_at",
  },
};

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Task, {
      as: 'tasks',
      through: models.Assignment,
      foreignKey: 'userId',
      otherKey: 'taskId'
    });
    this.hasMany(models.Comment, {as: 'comments', foreignKey: 'userId'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      paranoid: true,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
