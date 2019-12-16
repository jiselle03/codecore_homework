const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const app = express();
const router = require('./routes/cohorts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
     delete req.body._method;
    return method;
  }
})
);
app.use('/', router);
const PORT = process.env.PORT || 3000;
const DOMAIN = 'localhost'
app.listen(PORT, DOMAIN, () => {
    console.log(`Listening at http://${DOMAIN}:${PORT} in ${app.get('env')} environment`);
});

module.exports = app;
