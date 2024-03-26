const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';
const UserSchema = {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false
    }
}

class User extends Model{
    static associate(){

    }
    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User'
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User };