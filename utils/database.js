const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_js_complete", "root", "wafula1998", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
