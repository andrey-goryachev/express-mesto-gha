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
    name: Joi.string().required().min(2).max(30),
    link: Joi.string(),
  }),
}), createCard);

router.delete('/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), addLike);

router.delete('/:cardId/likes', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), removeLike);

module.exports = router;
