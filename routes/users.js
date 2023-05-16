const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', auth, getCurrentUser);

router.patch('/me', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    about: Joi.string()
      .min(2)
      .max(30),
    name: Joi.string()
      .min(2)
      .max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .regex(/^(https?|ftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/),
  }),
}), updateAvatar);

router.get('/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .required()
      .min(20),
  }),
}), getUserById);

router.get('/', auth, getUsers);

module.exports = router;
