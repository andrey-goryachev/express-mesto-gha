const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { handleErrors } = require('./errors/errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  autoIndex: true,
});

app.use(express.json());
app.use(router);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение запущено, порт ${PORT}`);
});
