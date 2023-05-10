const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/signin', login);
router.post('/signup', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
