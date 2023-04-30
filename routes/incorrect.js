const router = require('express').Router();
const { NotFoundError, handleErrors } = require('../errors/errors');

router.get('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
router.post('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
router.put('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
router.patch('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
router.delete('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));

module.exports = router;
