const fs = require("fs");
const path = require("path");

const getProductsFromFile = () => {};

// const products = []; // commenting this because now we will store the products in a file
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // "this" refers to the object created by this class
    // products.push(this);

    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // static means that the function can be called on the class directly rather than on any instance
  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
    // return products;
  }
};
