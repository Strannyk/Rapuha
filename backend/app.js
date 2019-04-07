const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();

let accessLogStream;
const isProductionMode = process.env.mode === 'prod';

if (isProductionMode) {
  accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
}

const loggerOptions = isProductionMode ? { stream: accessLogStream } : null;

app.use(logger('dev', loggerOptions));

const corsOptions = {
  origin: 'http://127.0.0.1:8080',
  optionsSuccessStatus: 200
};

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/admin', adminRouter);

module.exports = app;
