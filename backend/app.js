const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const { isProduction } = require('./config/keys');

const csurf = require('csurf');

const usersRouter = require('./routes/api/users');
const itinerariesRouter = require('./routes/api/itineraries');
const reviewsRouter = require('./routes/api/reviews');
const sessionRouter = require('./routes/api/session');
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!isProduction) {
    // Enable CORS only in development because React will be on the React
    // development server (http://localhost:3000). (In production, the Express 
    // server will serve the React files statically.)
    app.use(cors());
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use('/api/users', usersRouter);
app.use('/api/session', sessionRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/csrf', csrfRouter);

module.exports = app;
