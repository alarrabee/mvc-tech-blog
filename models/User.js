//Defines a User model for a database with fields for id, username and password. It includes a method for password comparison and a hook to hash passwords before saving them.

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


// compares a given password with the hashed password stored in the database
class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}


User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6],
        },
      },
    },
    {
      //hashes the password before saving a new user to the database.
      hooks: {
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
            if (updatedUserData.password) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            }
            return updatedUserData;
          },
      },
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );

  
  
  module.exports = User;