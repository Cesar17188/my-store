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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
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
