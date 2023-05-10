const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:id', auth, deleteCard);
router.put('/:cardId/likes', auth, addLike);
router.delete('/:cardId/likes', auth, removeLike);

module.exports = router;
