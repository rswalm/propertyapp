const path = require('path');

module.exports = function (app) {
  // index route loads view.html
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/subscription', (req, res) => {
    res.render('subscription');
  });

  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  app.get('/about', (req, res) => {
    res.render('about');
  });
  app.get('/postProduct', (req, res) => {
    res.render('postProduct');
  });
};
