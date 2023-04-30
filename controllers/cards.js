const Card = require('../models/card');
const { handleErrors, NotFoundError } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.send({ cards }))
    .catch((err) => handleErrors(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => handleErrors(err, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ card }))
    .catch((err) => handleErrors(err, res));
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('карточка не найдена'));
      }
      return res.send({ card });
    })
    .catch((err) => handleErrors(err, res));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива, если он там есть
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('карточка не найдена'));
      }
      return res.send({ card });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
};
