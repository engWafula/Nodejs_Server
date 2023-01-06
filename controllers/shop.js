const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const isAuth = require("../middleware/is-auth")


exports.getProducts = (req, res, next) => {
  Product.find().then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
        });
  });
};

exports.getProduct = (req,res,next) =>{
  const prodId = req.params.productId
  Product.findById(prodId).then((product)=>{
    res.render('shop/product-detail',{
      product:product,
      pageTitle:product.title,
      path:'/products'
    })
  }).catch(err=>{
    console.log(err)
  })
}


exports.getIndex = (req, res, next) => {
  Product.find().then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  if (prodId) {
    User.findById(req.user._id)
      .then(user => {
        return user.removeFromCart(prodId);
      })
      .then(result => {
        console.log(result);
        res.redirect('/cart');
      })
      .catch(err => next(err));
  } else {
    res.redirect('/cart');
  }
};

exports.postOrder = (req, res, next) => {
  User.findById(req.user._id)
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        if (i.productId) {
          return {
            quantity: i.quantity,
            product: { ...i.productId._doc }
          };
        }
        return null;
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user._id
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => next(err));
};




exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      console.log(orders)
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => console.log(err));
};
