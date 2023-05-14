const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const incorrect = require('./incorrect');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', incorrect);

module.exports = router;
