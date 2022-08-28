const faker = require('faker');
const ProductsService = require('./product.service');

const productsService = new ProductsService();

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: `category ${index+1}`,
        description: faker.commerce.productName()
      });
    }
  }

  create(body) {
    const id = faker.datatype.uuid()
    body = {id, ...body};
    this.categories.push(body);
    return this.categories;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  findCategoryProduct(categoryId ,productId) {
    const category = this.findOne(categoryId);
    const product = productsService.findOne(productId);
    return {...category, product};
  }

  update(id, body = {}) {
    const category = this.findOne(id);
    const index = this.categories.findIndex(item => item.id === id);
    if (category) {
      this.categories[index] = {
        id: category.id,
        name: body.name || category.name,
        description: body.description || category.description
      }
    }
    return category;
  }

  delete(id) {
    const category = {...this.categories.find(item => item)};
    if (category) {
      this.categories = this.categories.filter(p => p.id !== id);
      return category;
    }
  }
}

module.exports = CategoriesService;
