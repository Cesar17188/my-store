const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');


const router = express.Router();
const productsService = new ProductsService();

router.get('/', async (_req, res) => {
  const products = await productsService.find();
  res.json(products);
});

router.get('/filter', (_req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await productsService.create(body);
    res.status(201).json({
      message: 'created',
      product: newProduct,
    });
});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct = await productsService.update(id, body);
      res.json(updateProduct);
    }catch (error) {
      next(error);
    }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await productsService.delete(id);
  if(rta) {
    res.status(201).json(rta);
  } else {
    res.status(501).json({
      message: 'Product not found'
    });
  }

});

module.exports = router;
