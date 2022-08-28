const faker = require('faker');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        age: faker.datatype.number({min:18, max:85}),
      });
    }
  }

  create(body) {
    const id = faker.datatype.uuid()
    body = {id, ...body};
    this.users.push(body);
    return this.users;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(item => item.id === id);
  }

  update(id, body = {}) {
    const user = this.findOne(id);
    const index = this.users.findIndex(item => item.id === id);
    if (user) {
      this.users[index] = {
        id: user.id,
        name: body.name || user.name,
        age: body.age || user.age,
      }
    }
    return user;
  }

  delete(id) {
    const user = {...this.users.find(item => item)};
    if (user) {
      this.users = this.users.filter(p => p.id !== id);
      return user;
    }
  }
}

module.exports = UsersService;
