require('dotenv').config();
console.clear();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const joi = require('joi');
const helmet = require('helmet');
const api = require('./api');
const { errorHandler, notFound, databaseStatus } = require('./middlewares');
const connect = require('./lib/database');
const cookieParser = require('cookie-parser');

// Configs
const { CLIENT, WEB_SERVER, META, CORS } = require('./lib/configs');

const app = express();

//Database
connect()
  .then((client) => {
    app.set('database', true);
    app.set('database-client', client);
  })
  .catch((err) => {
    console.log(err);
    app.set('database', false);
  });

// Middlewares
app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(
  cors({
    origin: [CORS.ALLOWED],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  }),
);
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(express.json());
app.set('view engine', 'ejs');

const functions = {
  string: () => {
    return 'string';
  },
  alphanum: () => {
    return 'alphanum';
  },
  number: () => {
    return 'number';
  },
};

// API route
app.use(`/${META.API_VERSION}`, databaseStatus, api);

app.listen(WEB_SERVER.PORT, () => {
  console.log(`Running on port: ${WEB_SERVER.PORT}`);
});

app.use(notFound);
app.use(errorHandler);
