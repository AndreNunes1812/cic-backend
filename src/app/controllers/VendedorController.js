const Vendedor = require('../models/Vendedor');
const Op = require('sequelize').Op;

class VendedorController {

  async index(req, res) {

    const vendedor = await Vendedor.findAll({
      attributes: ['id', 'nome' ,'ativo'],

    });
    try {
      if (vendedor) {
        res.json(vendedor);
      } else {
        res.json({ message: 'não à vendedor disponível', status: 304 });
      }
    } catch (error) {
      console.log('error :', error.Error);
    }
  }

  async create(req, res) {

    try {
      const vendedor = await Vendedor.create(req.body);

      res.status(201).json(vendedor);

    } catch (error) {

      res.status(401).json({
        message: 'erro ao criar Vendedor',
       // erro,
      });
    }
  }

  async findById(req, res) {

    const { id } = req.params;

    const vendedor = await Vendedor.findOne({ where: { id } });

    res.json(vendedor);
  }

  async update(req, res) {

    const { id } = req.params;

    const vendedor = await Vendedor.findByPk(id);

    try {
      await vendedor.update(req.body, {
        where: { id },
      });

      return res.status(201).json(vendedor);

    } catch (error) {

      const { errors } = JSON.parse(JSON.stringify(error));

      res.status(401).json({
        message: 'erro ao atualizar o vendedor',
        error,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const vendedor = await Vendedor.findByPk(id);

    try {

      await vendedor.destroy();

    } catch (errors) {

      const { error } = JSON.parse(JSON.stringify(errors));
      res.status(401).json({
        message: 'erro ao deletar o vendedor',
        error,
      });

    }
    return res
      .status(200)
      .json({ mensagem: 'vendedor excluido.', status: '200' });
  }

  async like(req, res) {
    const { description } = req.body;

    const vendedor = await Vendedor.findAll({
      where: {
        nome: { [Op.like]: '%' + req.query.description + '%' },
        ativo: 'S'
      },
    });

    return res.status(200).json(vendedor);
  }


}
module.exports = new VendedorController();
