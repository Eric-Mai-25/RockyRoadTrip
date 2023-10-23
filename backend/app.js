const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/api/users');
const itinerariesRouter = require('./routes/api/itineraries');
const reviewsRouter = require('./routes/api/reviews');
const sessionRouter = require('./routes/api/session');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/session', sessionRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/reviews', reviewsRouter);

module.exports = app;
