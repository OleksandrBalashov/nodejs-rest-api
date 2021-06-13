const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const {
  contacts: contactsRouter,
  users: usersRouter,
} = require('./routes/api');
require('./configs/config-passport');
const cookieParser = require('cookie-parser');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const message = err.message || 'server error';
  const code = err.code || 500;

  res.status(500).json({
    status: 'fail',
    code,
    message,
  });
});

module.exports = app;
