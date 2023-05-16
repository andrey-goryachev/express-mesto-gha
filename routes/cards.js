const router = require('express').Router();
const {
  celebrate,
  Segments,
  Joi,
} = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', auth, getCards);

router.post('/', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    link: Joi.string()
      .required()
      .regex(/^(https?|ftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), createCard);

router.delete('/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .required()
      .min(20),
  }),
}), deleteCard);

router.put('/:cardId/likes', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .min(20),
  }),
}), addLike);

router.delete('/:cardId/likes', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .min(20),
  }),
}), removeLike);

module.exports = router;
