const Catalago = require('../models/Catalago');
const Itens_catalago = require('../models/Itens_catalago');

const path = require('path');
const Op = require('sequelize').Op;

const CSVToJSON = require('csvtojson');

class catalagoController {
  async index(req, res) {
    console.log(' ****  index catalago ****');

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
    console.log('body:', req.body);

    try {
      const catalago = await Catalago.create(req.body);

      res.status(201).json(catalago);
    } catch (error) {
      //  const { errors } = JSON.stringify(error);

      console.log('errors:', error);

      // const erro = errors[0].message

      res.status(401).json({
        message: 'erro ao criar o catalago',
        // erro,
      });
    }
  }

  async findById(req, res) {
    console.log('find', req.params.id);

    const { id } = req.params;

    const catalago = await Catalago.findOne({ where: { id } });

    res.json(catalago);
  }

  async update(req, res) {
    const { id } = req.params;

    console.log(id);

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

    console.log('vendedor:', vendedor_id, id);

    console.log('headers:', req.file.filename);

    const catalago = await Catalago.findByPk(id);

    try {

      await catalago.update(
        { nome_arquivo: req.file.filename },
        {
          where: { id },
        }
      );

      console.log('******************************');

      const caminho = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'backend',
        'public',
        'images'
      );


      const caminhoArquivo = caminho + '/'+ req.file.filename;

      console.log('req:', caminhoArquivo);

       CSVToJSON()
        .fromFile(caminhoArquivo)
        .then( async catalago => {

          catalago.map( async livro => {

            //  const jaRegistrado = await Itens_catalago.findOrCreate

              await Itens_catalago.findOrCreate({
                catalago_id: id,
                title: livro.title,
                authors: livro.authors,
                price: livro.price,
                publisher: livro.publisher,
                num_pages: livro.numPages,
                publication_date: livro.publicationDate,
              });
          });

          console.log('Proximo ');

        })
        .catch(err => {
          // log error if any
          console.log(err);
        });

      console.log('--------------------------------');

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
