const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.post('/signin', login);
router.post('/signup', createUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
