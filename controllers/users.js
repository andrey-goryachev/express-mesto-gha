const User = require('../models/user');
const { handleErrors, NotFoundError } = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => handleErrors(err, res));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError('пользователь не найден'));
      }
      return res.send({ user });
    })
    .catch((err) => handleErrors(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: true
  })
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  handleErrors,
  NotFoundError,

  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};
