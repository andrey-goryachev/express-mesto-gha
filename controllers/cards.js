const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      }
      // if (err instanceof mongoose.Error.DocumentNotFoundError) {
      //   res.status(400).send({ message: 'Карточка или пользователь не найден' });
      // }
      res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ card }))
    .catch((err) => {
      // if (err instanceof mongoose.Error.ValidationError) {
      //   res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      // }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(400).send({ message: 'Карточка или пользователь не найден' });
      }
      res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      // if (err instanceof mongoose.Error.ValidationError) {
      //   res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      // }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(400).send({ message: 'Карточка или пользователь не найден' });
      }
      res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива, если он там есть
    { new: true }
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      // if (err instanceof mongoose.Error.ValidationError) {
      //   res.status(400).send({ message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
      // }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(400).send({ message: 'Карточка или пользователь не найден' });
      }
      res.status(500).send({ message: `Произошла ошибка ${err.message}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
};
