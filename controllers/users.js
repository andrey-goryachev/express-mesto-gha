// const mongoose = require('mongoose');
const User = require('../models/user');
const { handleErrors, NotFoundError } = require('../errors/errors');

// class GroupErrors extends Error {}
// class NotFoundError extends GroupErrors {
//   constructor(message) {
//     super(message);
//     this.name = 'NotFoundError';
//     this.statusCode = 404;
//   }
// }

// const handleErrors = (err, res) => {
//   if (err instanceof GroupErrors) {
//     res.status(err.statusCode).send({ message: err.message });
//     return;
//   }
//   if (err instanceof mongoose.Error.ValidationError || mongoose.Error.CastError) {
//     res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки,
// пользователя, обновления аватара пользователя или профиля' });
//     return;
//   }
//   if (err instanceof mongoose.Error.DocumentNotFoundError) {
//     res.status(404).send({ message: 'карточка или пользователь не найден' });
//     return;
//   }
//   res.status(500).send({ message: `Произошла ошибка --- ${err}` });
// };

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => {
      handleErrors(err, res);
      // if (err instanceof mongoose.Error.DocumentNotFoundError || mongoose.Error.CastError) {
      //   res.status(400).send({ message: 'Карточка или пользователь не найден' });
      // }
      // res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError('пользователь не найден'));
      }
      return res.send({ user });
    })
    .catch((err) => {
      handleErrors(err, res);
      // if (err instanceof mongoose.Error.DocumentNotFoundError || mongoose.Error.CastError) {
      //   res.status(400).send({ message: 'Карточка или пользователь не найден' });
      // }
      // res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => handleErrors(err, res));
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: true // если пользователь не найден, он будет создан
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
