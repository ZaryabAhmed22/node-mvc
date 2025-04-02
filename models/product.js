const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// const products = []; // commenting this because now we will store the products in a file
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // "this" refers to the object created by this class
    // products.push(this);
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // static means that the function can be called on the class directly rather than on any instance
  static fetchAll(cb) {
    getProductsFromFile(cb);
    // return products;
  }
};
