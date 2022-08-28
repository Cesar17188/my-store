const faker = require('faker');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(body) {
    const id = faker.datatype.uuid()
    body = {id, ...body};
    this.products.push(body);
    return this.products;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update(id, body = {}) {
    const product = this.findOne(id);
    const index = this.products.findIndex(item => item.id === id);
    if (product) {
      this.products[index] = {
        id: product.id,
        name: body.name || product.name,
        price: body.price || product.price,
        image: body.image || product.image
      }
    }
    return product;
  }

  delete(id) {
    const product = {...this.products.find(item => item)};
    if (product) {
      this.products = this.products.filter(p => p.id !== id);
      return product;
    }
  }
}

module.exports = ProductsService;
