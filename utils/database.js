const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient
let _db;
const mongoConnect = (callback) =>{
  mongoClient.connect("mongodb+srv://Wafula:Wafula1998@cluster0.xkmw1xl.mongodb.net/shop?retryWrites=true&w=majority").then((client)=>{
    console.log("Connected Sucessfully")
    _db = client.db()
    callback(client)
  }).catch((err)=>{
    console.log(err)
  })
}

const getDb = ( )=>{
  if(_db){
    return _db
  }
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb