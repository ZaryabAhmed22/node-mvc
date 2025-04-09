const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const db = require("../util/database");

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
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  // static means that the function can be called on the class directly rather than on any instance
  static fetchAll() {
    return db.execute("SELECT * FROM products");
    // .then((result) => {})
    // .catch((err) => {});
  }

  static fetchById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static delete(id) {}
};
