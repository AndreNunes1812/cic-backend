const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const vendedorController = require('./app/controllers/VendedorController');
const catalagoController = require('./app/controllers/CatalagoController');

const routes = new Router();
const upload = multer(uploadConfig);

// Routes Vendedor
routes.put('/vendedor/:id', vendedorController.update);
routes.get('/vendedor', vendedorController.index);
routes.post('/vendedor', vendedorController.create);
routes.delete('/vendedor/:id', vendedorController.delete);
routes.get('/vendedor/description', vendedorController.like);

// Routes Catalago
routes.put('/catalago/:id', catalagoController.update);
routes.get('/catalago', catalagoController.index);
routes.post('/catalago', catalagoController.create);
routes.patch('/catalago/cvs', upload.single('cvs'), catalagoController.patch);

routes.delete('/catalago/:id', catalagoController.delete);
routes.get('/catalago/description', catalagoController.like);

module.exports = routes;
