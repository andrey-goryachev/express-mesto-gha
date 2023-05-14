const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
} = require('../controllers/users');

// router.post('/signin', login);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), createUser);

router.get('/me', auth, getCurrentUser);

router.patch('/me', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

router.get('/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), getUserById);
router.get('/', auth, getUsers);

module.exports = router;
