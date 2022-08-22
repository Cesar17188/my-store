const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'category 1',
      description: 'Sports'
    },
    {
      name: 'category 2',
      description: 'Adventure'
    }
  ]);
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    name: 'category 2',
    description: 'Adventure'
  });
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})

module.exports = router;
