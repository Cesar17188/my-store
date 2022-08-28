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
  const newProduct = productsService.create(body);
  res.status(201).json({
    message: 'created',
    product: newProduct
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateProduct = productsService.update(id, body);
  if(updateProduct) {
    res.json(updateProduct);
  }else {
    res.status(501).json({message: "Internal error"})
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = productsService.delete(id);
  if(rta) {
    res.status(201).json(rta);
  } else {
    res.status(501).json({
      message: 'Product not found'
    });
  }

});

module.exports = router;
