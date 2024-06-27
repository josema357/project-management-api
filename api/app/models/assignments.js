const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./users');
const { TASK_TABLE } = require('./tasks');

const ASSIGNMENT_TABLE = 'assignments';
const AssignmentSchema = {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'task_id',
        references: {
            model: TASK_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
}

class Assignment extends Model {
    static associate(){

    }
    static config(sequelize){
        return {
            sequelize,
            tableName: ASSIGNMENT_TABLE,
            modelName: 'Assignment'
        }
    }
}

module.exports = { Assignment, ASSIGNMENT_TABLE, AssignmentSchema };