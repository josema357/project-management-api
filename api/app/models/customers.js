const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./users");

const CUSTOMER_TABLE = "customers";
const CustomerSchema = {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
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

class Customer extends Model {
  static associate(models) {
    this.hasMany(models.Project, { as: "projects", foreignKey: "customerId" });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: "Customer",
      paranoid: true
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
