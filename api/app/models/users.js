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
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    },
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    get() {
      return moment(this.getDataValue('updateAt')).format('YYYY-MM-DD HH:mm:ss');
    },
    field: "updated_at",
  },
  deleteAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    get() {
      return moment(this.getDataValue('deleteAt')).format('YYYY-MM-DD HH:mm:ss');
    },
    field: "delete_at",
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
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
