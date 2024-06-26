const { Model, DataTypes, Sequelize } = require("sequelize");
const { PROJECT_TABLE } = require("./projects");

const TASK_TABLE = "tasks";
const TaskSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "registered",
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "project_id",
    references: {
      model: PROJECT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: "deleted_at",
  },
};

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.Project, { as: "project" });
    this.belongsToMany(models.User, {
      as: "users",
      through: models.Assignment,
      foreignKey: "taskId",
      otherKey: "userId",
    });
    this.hasMany(models.Comment, { as: "comments", foreignKey: "taskId" });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: "Task",
      paranoid: true,
    };
  }
}

module.exports = { Task, TASK_TABLE, TaskSchema };
