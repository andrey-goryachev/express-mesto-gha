// eslint-disable-next-line max-classes-per-file
const mongoose = require('mongoose');

const INCORRECT_DATA_ERROR_CODE = 400;
const NOT_AUTH_ERROR_CODE = 401;
const NOT_FOUND_CODE = 404;
const ALREADY_EXISTS_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    // this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_CODE;
  }
}

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTH_ERROR_CODE;
  }
}

const handleErrors = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof NotAuthError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания, удаления карточки, пользователя, обновления аватара пользователя или профиля' });
    return;
  }
  if (err.code === 11000) {
    res.status(ALREADY_EXISTS_CODE).send({ message: 'Пользователь с такой почтой уже существует' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });

  next();
};

module.exports = {
  handleErrors,
  NotFoundError,
  NotAuthError,
};
