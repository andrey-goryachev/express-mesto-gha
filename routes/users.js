const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfile);

module.exports = router;
