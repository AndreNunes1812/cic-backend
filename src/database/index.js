const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Vendedor = require('../app/models/Vendedor');

const models = [
  Vendedor,
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
