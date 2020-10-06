const Sequelize = require('sequelize');
const db = require('../models');
const fs = require('fs');
const multerUpload = require('../middleware/upload');

function gridDisplay(dbProducts) {
  const result = [];
  let temp = [];
  for (let i = 0; i < dbProducts.length; i++) {
    temp.push(dbProducts[i]);
    if (temp.length === 3) {
      result.push(temp);
      temp = [];
    }
  }
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
}

module.exports = function (app) {

  // GET route for retrieving a single product
  app.get('/api/products/:product_id', (req, res) => {
    db.Products.findOne({
      where: {
        product_id: req.params.product_id,
      },
    })
      .then((dbProduct) => {
        res.json(dbProduct);
      });
  });

  // POST route for saving a new product
  app.post('/api/sell', (req, res) => {
    console.log(req.body);
    db.Products.create({
      product_name: req.body.product_name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
    })
      .then((dbProduct) => {
        res.json(dbProduct);
      });
  });

  // DELETE route for deleting products from cart
  app.delete('/api/products/:product_id', (req, res) => {
    db.Products.destroy({
      where: {
        product_id: req.params.product_id,
      },
    })
      .then((dbProduct) => {
        res.json(dbProduct);
      });
  });

  // GET route to display all the products based on category
  app.get('/products', (req, res) => {
    const whereCondition = {};
    if (req.query.category) {
      whereCondition.category = req.query.category;
    }

    db.Products.findAll({
      where: whereCondition,
    })
      .then((dbProducts) => {
        const result = gridDisplay(dbProducts);
        res.render('products', { products: result });
      });
  });



  // PUT route for updating products in cart
  app.put('/api/products', (req, res) => {
    db.Products.update(req.body,
      {
        where: {
          product_id: req.body.product_id,
        },
      })
      .then((dbProduct) => {
        res.json(dbProduct);
      });
  });

  // POST route for saving a new product
  app.post('/api/postProduct', (req, res) => {
    console.log(req.body, 'req');
    db.Products.create({
      product_name: req.body.product_name,
      price: req.body.price,
      category: 'Building',
      description: req.body.description,
      img_url: req.body.img_url,
    })
      .then((dbProduct) => {
        res.json(dbProduct);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  });
};
