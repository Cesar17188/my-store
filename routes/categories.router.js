const express = require('express');
const CategoriesService = require('../services/categories.service');

const router = express.Router();
const categoriesService = new CategoriesService();

router.get('/', (_req, res) => {
  const categories = categoriesService.find();
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = categoriesService.findOne(id);
  res.json(category);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  const result = categoriesService.findCategoryProduct(categoryId,productId);
  res.json(result);
})

router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = categoriesService.create(body);
  res.status(201).json({
    message: 'created',
    category: newCategory
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updateCategory = categoriesService.update(id, body);
  if(updateCategory) {
    res.json(updateCategory);
  }else {
    res.status(501).json({message: "Internal error"})
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = categoriesService.delete(id);
  if(rta) {
    res.status(201).json(rta);
  } else {
    res.status(501).json({
      message: 'Category not found'
    });
  }
});

module.exports = router;
