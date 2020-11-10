'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserProfile.init({
    profileImg: DataTypes.STRING,
    bio: DataTypes.STRING,
    gamesStarted: DataTypes.INTEGER,
    gamesFinished: DataTypes.INTEGER,
    gameWon: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    plows: DataTypes.INTEGER,
    combines: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};