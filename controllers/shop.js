// const products = [];
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch(() => {});
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchById(prodId).then(([prod]) => {
    res.render("shop/product-detail", {
      product: prod[0],
      pageTitle: prod.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch(() => {});
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    if (!cart) {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: [],
      });
    }

    Product.fetchAll((products) => {
      const cartProducts = products.map((prod) => {
        const cartProduct = cart?.products.find((prod) => prod.id === prod.id);

        if (cartProduct) {
          return { productData: prod, qty: cartProduct.qty };
        }
      });
      console.log(cartProducts);
      // for (product of products) {
      //   const cartProducts = [];
      //   if (cart.products.find((prod) => prod.id === product.id)) {
      //     cartProducts.push({productData: product, qty:  );
      //   }
      // }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.fetchById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};
