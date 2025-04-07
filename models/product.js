const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err || !fileContent) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// const products = []; // commenting this because now we will store the products in a file
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // "this" refers to the object created by this class
    // products.push(this);

    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductindex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        // using "this" to refer to the object becuase we are actually creating a new product with the same id, basically overriding the previous data
        updatedProducts[existingProductindex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  // static means that the function can be called on the class directly rather than on any instance
  static fetchAll(cb) {
    getProductsFromFile(cb);
    // return products;
  }

  static fetchById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
};
