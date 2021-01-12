const Sequelize = require('sequelize');
const { Model } = require('sequelize');

const uuid = require('uuidv4');

class Catalago extends Model {

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
        nome_arquivo: Sequelize.TEXT,
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

    this.addHook('beforeSave', async catalago => {

    });


    return this;
  }

}

module.exports = Catalago;
