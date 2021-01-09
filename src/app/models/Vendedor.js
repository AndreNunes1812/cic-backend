const Sequelize = require('sequelize');
const { Model } = require('sequelize');

const uuid = require('uuidv4');


class Vendedor extends Model {

  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        nome: Sequelize.STRING,
        ativo: Sequelize.STRING(1),
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: new Date(),
        },
        update_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: new Date(),
        }
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async vendedor => {


    });


    return this;
  }



}

module.exports = Vendedor;
