const fs = require('fs');

function readImageData(path) {
  return Buffer.from(fs.readFileSync(path)).toString('base64');
}
module.exports = function (sequelize, DataTypes) {
  const Products = sequelize.define('Products',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    });

  Products.bulkCreate([
    {
      product_name: 'Property A',
      price: "$10k",
      category: 'Building',
      description: 'Property Description',

      img_url: `${__dirname}/../public/assets/img/build.jpeg`
    },
    {
      product_name: 'Property B',
      price: "$20k",
      category: 'Building',
      description: 'Property Description',
      img_url: `${__dirname}/../public/assets/img/build.jpeg`
    },
    {
      product_name: 'Property C',
      price: "$30k",
      category: 'Building',
      description: 'Property Description',
      img_url: `${__dirname}/../public/assets/img/build.jpeg`
    },

  ], { ignoreDuplicates: true });
  return Products;
};
