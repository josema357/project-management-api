const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./users');
const { TASK_TABLE } = require('./tasks');

const COMMENT_TABLE = 'comments';
const CommentSchema = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
    },
}

class Comment extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user'});
        this.belongsTo(models.Task, { as: 'task'});
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: COMMENT_TABLE,
            modelName: 'Comment'
        }
    }
}

module.exports = { Comment, CommentSchema, COMMENT_TABLE };