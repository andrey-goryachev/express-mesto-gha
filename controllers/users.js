const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.message}` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ user }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.message}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true // если пользователь не найден, он будет создан
  })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};
