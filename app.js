const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '644ace8f0bdd1d25195ae207'
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
