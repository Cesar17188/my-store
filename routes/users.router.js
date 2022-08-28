const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router();
const usersService = new UsersService();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  const users = usersService.find();
  if (limit && offset) {
    res.json({
      limit,
      offset,
      users
    });
  } else {
    res.json(users);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = usersService.findOne(id);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  usersService.create(body);
  res.status(201).json({
    message: 'created',
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const {name, age} = req.body;
  const updateUser = usersService.update(id, {name, age});
  if(updateUser) {
    res.json({
      message: 'updated',
      id,
      data: req.body
    });
  }else {
    res.status(501).json({message: "Internal error"})
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const newUser = usersService.delete(id);
  if(newUser) {
    res.status(201).json({
      message: 'deleted',
      id,
    });
  } else {
    res.status(501).json({
      message: 'User not found'
    });
  }

});

module.exports = router;
