const router = require('express').Router();
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

router.post('/signin', login);
router.post('/signup', createUser);
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateProfile);
router.patch('/me/avatar', auth, updateAvatar);
router.get('/:id', auth, getUserById);
router.get('/', auth, getUsers);

module.exports = router;
