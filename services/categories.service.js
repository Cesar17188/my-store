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
    const newCategory = {id, ...body};
    this.categories.push(newCategory);
    return newCategory;
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
    return {category, product};
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
