const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../errors/errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  // TODO: вынести секретный ключ в окружение
  let payload;

  try {
    payload = jwt.verify(token, 'asdfgfjlAsdfweofuheo1rffwe!!asd,');
  } catch (err) {
    next(new NotAuthError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
