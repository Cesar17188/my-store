const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send("Hola mi server en express");
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })
  }
  res.json(products);
});

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  res.json({
    productId,
    name: 'Product 2',
    price: 2000
  });
});



app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros');
  }
});

app.get('/categories', (req, res) => {
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

app.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    name: 'category 2',
    description: 'Adventure'
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})

app.listen(port, () => {
  console.log(`Mi port http://localhost:${port}`);
});
