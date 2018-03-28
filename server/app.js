const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const index = require('./routes/indexRouter');
const jepret = require('./routes/jepretRouter');

const app = express();

mongoose.connection.openUri('mongodb://localhost:27017/jepretgram')
mongoose.Promise = global.Promise
mongoose.connection.once('open', () => {
  console.log('mongoose connection success')
}).on('error', (error) => {
  console.error('connection error', error)
})

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', jepret);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ err : 'error'});
});

module.exports = app;
