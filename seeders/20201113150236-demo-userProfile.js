'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("UserProfiles",[
      {
        userId: 1,
        profileImg: "",
        bio: "I can Fix it",
        gamesStarted: 2,
        gamesFinished: 1,
        gamesWon: 1,
        points: 10,
        plows: 0,
        combines: 0
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
