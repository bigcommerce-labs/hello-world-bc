'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./lib/db');
require('dotenv').config();

const app = express();

const auth = require('./routes/auth');
const index = require('./routes/index');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

setInterval(function() {
  db.query('SELECT 1');
}, 5000);

app.set('trust proxy', 1);
app.use(
  session({
    proxy: true,
    secret: process.env.COOKIE,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use('/api/auth', auth);
app.use('/', index);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
