const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const accessLogger = require('morgan');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();

let accessLogStream;
const isProductionMode = process.env.mode === 'prod';

if (isProductionMode) {
  accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
}

const accessLoggerOptions = isProductionMode ? { stream: accessLogStream } : null;

app.use(accessLogger('dev', accessLoggerOptions));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/admin', adminRouter);

module.exports = app;
