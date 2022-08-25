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

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
