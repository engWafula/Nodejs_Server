const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const sequelize = require("./utils/database")
const errorController = require('./controllers/error');
// const Product = require("./models/product")
const User = require("./models/user")
const {mongoConnect} = require("./utils/database")
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


require('dotenv').config()
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
    User.findById("63b2837aaef09cb5024f9d01").then(user=>{
        req.user = new User(user.name,user.email,user.cart,user._id)
        next()
    }).catch(err=>console.log(err))
})
 app.use('/admin', adminRoutes);
app.use(shopRoutes);



app.use(errorController.get404);
mongoConnect(()=>{
    app.listen(process.env.PORT || 3000)
})


