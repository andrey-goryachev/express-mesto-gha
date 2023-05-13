const Card = require('../models/card');
const { NotFoundError } = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  const cardId = req.params.id;
  Card.findOneAndRemove({ _id: cardId, owner })
    .then((card) => res.send({ card }))
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch(() => next(new NotFoundError('Карточка не найдена')));
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch(() => next(new NotFoundError('Карточка не найдена')));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
