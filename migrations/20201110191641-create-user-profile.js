'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: "users", key: "id"}
      },
      profile_img: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      games_started: {
        type: Sequelize.INTEGER
      },
      games_finished: {
        type: Sequelize.INTEGER
      },
      games_won: {
        type: Sequelize.INTEGER
      },
      points: {
        type: Sequelize.INTEGER
      },
      plows: {
        type: Sequelize.INTEGER
      },
      combines: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userprofiles');
  }
};