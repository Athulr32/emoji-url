const mongodb = require("mongodb");
require('dotenv').config();
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (server) => {

    MongoClient.connect(
        process.env.MONGODB_URI
    ).then(
        client => {
            console.log("Connected to  Database");
            _db = client.db();

            server()
        }
    ).catch(err => {
        throw err;
    })


}


const getDb = () => {
    if (_db) {
        return _db;
    }

    throw "No database Instance Found"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb