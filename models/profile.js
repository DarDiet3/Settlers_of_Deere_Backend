'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  };
  Profile.init({
    userId: DataTypes.INTEGER,
    profileImg: DataTypes.STRING,
    bio: DataTypes.TEXT,
    gamesStarted: DataTypes.INTEGER,
    gamesFinished: DataTypes.INTEGER,
    gamesWon: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    plows: DataTypes.INTEGER,
    combines: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};