const { Model, DataTypes, Sequelize } = require("sequelize");
const { CUSTOMER_TABLE } = require("./customers");

const PROJECT_TABLE = "projects";
const ProjectSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "start_date",
  },
  finishDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "finish_date",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "registered",
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "customer_id",
    references: {
      model: CUSTOMER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Project extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: "customer" });
    this.hasMany(models.Task, { as: "tasks", foreignKey: "taskId" });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: "Project",
    };
  }
}

module.exports = { Project, ProjectSchema, PROJECT_TABLE };
