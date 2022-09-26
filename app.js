const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
 app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(rootDir, 'Views', '404.html'));
});


app.listen(9000)