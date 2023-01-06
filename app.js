const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const sequelize = require("./utils/database")
const errorController = require("./controllers/error");
// const Product = require("./models/product")
const User = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session)
const flash = require("connect-flash")
const csrf = require("csurf")
require("dotenv").config();
const app = express();
const MongoDb_Uri = "mongodb+srv://Wafula:Wafula1998@cluster0.xkmw1xl.mongodb.net/shop?retryWrites=true&w=majority"
const store = new MongoDbStore({
  uri:MongoDb_Uri,
  collection:"sessions"
})

const csrfProtection = csrf()

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store:store
  })
);
app.use(csrfProtection)
app.use(flash())
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MongoDb_Uri)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
