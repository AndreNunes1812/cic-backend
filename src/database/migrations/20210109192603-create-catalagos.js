'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('catalagos', {

      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },

      vendedor_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      nome_arquivo:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      ativo: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'S'
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },

      update_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('catalagos');
  }
};
