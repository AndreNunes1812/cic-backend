const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const database = require('./database');

class Server {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use('/static', express.static('public'));
    this.server.use(bodyParser.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new Server().server;
