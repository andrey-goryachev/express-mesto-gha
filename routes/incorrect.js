const router = require('express').Router();
const { NotFoundError } = require('../errors/errors');

router.all('*', (req, res, next) => Promise.reject(new NotFoundError('Такой страницы не существует'))
  .catch(next));

module.exports = router;
