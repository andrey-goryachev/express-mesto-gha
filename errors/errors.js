const mongoose = require('mongoose');

class GroupErrors extends Error {}

class NotFoundError extends GroupErrors {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

const handleErrors = (err, res) => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || mongoose.Error.CastError) {
    res.status(400).send({ message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' });
    return;
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).send({ message: 'карточка или пользователь не найден' });
    return;
  }
  res.status(500).send({ message: `Произошла ошибка --- ${err}` });
};

module.exports = { handleErrors, NotFoundError };
