const Sequelize = require('sequelize');
const { Model } = require('sequelize');

const uuid = require('uuidv4');

class ItensCatalagos extends Model {

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        vendedor_id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        authors: Sequelize.STRING,
        num_pages: Sequelize.DECIMAL(10),
        publication_date: Sequelize.DATE,
        publisher: Sequelize.STRING,
        price: Sequelize.DECIMAL(10,2),
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async catalago => {

    });


    return this;
  }

}

module.exports = ItensCatalagos;
