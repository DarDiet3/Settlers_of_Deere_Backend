'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PctLeaderBoard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PctLeaderBoard.init({
    username: DataTypes.STRING,
    gamesStarted: DataTypes.INTEGER,
    gamesWon: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PctLeaderBoard',
  });
  return PctLeaderBoard;
};