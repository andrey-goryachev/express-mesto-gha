const router = require('express').Router();
const { NotFoundError, handleErrors } = require('../errors/errors');

router.all('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));

module.exports = router;
