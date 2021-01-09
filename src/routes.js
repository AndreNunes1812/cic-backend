const { Router } = require('express');
const multer = require('multer');

const vendedorController = require('./app/controllers/VendedorController');

// const sessionController = require('./app/controllers/SessionController');

// const authMiddleware = require('./app/middlewares/auth');

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'public/images/');
  },
  filename(req, file, callback) {
    callback(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });

const routes = new Router();

// routes.use(authMiddleware);

// Routes Vendedor
routes.put('/vendedor/:id', vendedorController.update);
routes.get('/vendedor', vendedorController.index);
routes.post('/vendedor', vendedorController.create);
routes.delete('/vendedor/:id', vendedorController.delete);
routes.get('/vendedor/description', vendedorController.like);

module.exports = routes;
