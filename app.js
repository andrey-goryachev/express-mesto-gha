const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NotFoundError, handleErrors } = require('./errors/errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '644ace8f0bdd1d25195ae207' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// TODO: осталось обработать неправильные маршруты
app.get('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
app.post('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
app.put('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
app.patch('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));
app.delete('*', (req, res) => Promise.reject(new NotFoundError('такой страницы не существует')).catch((err) => handleErrors(err, res)));

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
