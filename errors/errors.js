const mongoose = require('mongoose');

const INCORRECT_DATA_ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const handleErrors = (err, res) => {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND_CODE).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка --- ${err}` });
};

module.exports = { handleErrors, NotFoundError };
