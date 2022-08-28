const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const productsService = new ProductsService();

router.get('/', (_req, res) => {
  const products = productsService.find();
  res.json(products);
});

router.get('/filter', (_req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productsService.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  productsService.create(body);
  res.status(201).json({
    message: 'created',
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const {name, price, image} = req.body;
  const updateProduct = productsService.update(id, {name, price, image});
  if(updateProduct) {
    res.json({
      message: 'updated',
      id,
      data: req.body
    });
  }else {
    res.status(501).json({message: "Internal error"})
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const newProduct = productsService.delete(id);
  if(newProduct) {
    res.status(201).json({
      message: 'deleted',
      id,
    });
  } else {
    res.status(501).json({
      message: 'Product not found'
    });
  }

});

module.exports = router;
