const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Vendedor = require('../app/models/Vendedor');
const Catalago = require('../app/models/Catalago');
const Itens_catalago = require('../app/models/Itens_catalago');

const models = [
  Vendedor,
  Catalago,
  Itens_catalago
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
//    TipoSegmento.associate(this.connection.models);
//    Auxiliar.associate(this.connection.models);

  }
}

module.exports = new Database();
