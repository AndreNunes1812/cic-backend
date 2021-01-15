const Catalago = require('../models/Catalago');
const Itens_catalago = require('../models/Itens_catalago');

const path = require('path');
const Op = require('sequelize').Op;

const CSVToJSON = require('csvtojson');

class catalagoController {
  async index(req, res) {

    const catalago = await Catalago.findAll({
      attributes: ['id', 'vendedor_id', 'nome_arquivo', 'ativo'],
    });
    try {
      if (catalago) {
        res.json(catalago);
      } else {
        res.json({ message: 'não à catalago disponível', status: 304 });
      }
    } catch (error) {
      console.log('error :', error.Error);
    }
  }

  async create(req, res) {

    try {

      const catalago = await Catalago.create(req.body);

      res.status(201).json(catalago);
    } catch (error) {
      res.status(401).json({
        message: 'erro ao criar o catalago',
        // erro,
      });
    }
  }

  async findById(req, res) {

    const { id } = req.params;

    const catalago = await Catalago.findOne({ where: { id } });

    res.json(catalago);
  }

  async update(req, res) {
    const { id } = req.params;

    const catalago = await Catalago.findByPk(id);

    try {
      await catalago.update(req.body, {
        where: { id },
      });

      return res.status(201).json(catalago);
    } catch (error) {
      const { errors } = JSON.parse(JSON.stringify(error));

      res.status(401).json({
        message: 'erro ao atualizar o catalago',
        error,
      });
    }
  }

  async patch(req, res) {
    const { id, vendedor_id } = req.body;

    const catalago = await Catalago.findByPk(id);

    try {
      await catalago.update(
        { nome_arquivo: req.file.filename },
        {
          where: { id },
        }
      );

      const caminho = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        'images'
      );

      const caminhoArquivo = caminho + '/' + req.file.filename;

      CSVToJSON()
        .fromFile(caminhoArquivo)
        .then(async catalago => {
          catalago.map(async livro => {

            const livroJaRegistradoComVendedor = await Itens_catalago.findOne({
              where: {
                vendedor_id: vendedor_id,
                title: livro.title,
                authors: livro.authors,
                price: livro.price,
                publisher: livro.publisher,
                num_pages: livro.numPages,
              },
            });

            if (livroJaRegistradoComVendedor === null) {
              await Itens_catalago.create({
                vendedor_id: vendedor_id,
                title: livro.title,
                authors: livro.authors,
                price: livro.price,
                publisher: livro.publisher,
                num_pages: livro.numPages,
                publication_date: livro.publicationDate,
              });
            }
          });

        })
        .catch(err => {
          // log error if any
          console.log(err);
        });

      return res.status(201).json(catalago);
    } catch (error) {
      const { errors } = JSON.parse(JSON.stringify(error));

      res.status(401).json({
        message: 'erro ao atualizar o catalago',
        error,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const catalago = await Catalago.findByPk(id);

    try {
      await catalago.destroy();
    } catch (errors) {
      const { error } = JSON.parse(JSON.stringify(errors));
      res.status(401).json({
        message: 'erro ao deletar o catalago',
        error,
      });
    }
    return res
      .status(200)
      .json({ mensagem: 'catalago excluido.', status: '200' });
  }

  async like(req, res) {
    const { description } = req.body;

    const catalago = await Catalago.findAll({
      where: {
        nome: { [Op.like]: '%' + req.query.description + '%' },
        ativo: 'S',
      },
    });

    return res.status(200).json(vendedor);
  }
}
module.exports = new catalagoController();
