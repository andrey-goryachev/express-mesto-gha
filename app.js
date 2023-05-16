const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { handleErrors } = require('./errors/errors');
const { mongoPath } = require('./config');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(mongoPath, { autoIndex: true });

app.use(express.json());
app.use(router);
// noinspection JSCheckFunctionSignatures
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено, порт ${PORT}`);
});
