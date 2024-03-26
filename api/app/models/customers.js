const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./users')

const CUSTOMER_TABLE = 'customers';
const CustomerSchema = {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Customer extends Model{
    static associate(models){
        this.belongsTo(models.User, { as: 'user' });
        this.hasMany(models.Project, { as: 'projects', foreignKey: 'customerId' });
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer'
        }
    }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer }