'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('itens_catalagos', {

      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },

      vendedor_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      authors: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      num_pages: {
        type: Sequelize.DECIMAL(5),
        allowNull: false,
      },

      publication_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      publisher:{
         type: Sequelize.STRING,
         allowNull: false,
      },

      price:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('itens_catalagos');
  }
};
