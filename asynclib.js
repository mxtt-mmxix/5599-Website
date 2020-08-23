//Library to promisify callback async functions

const fs = require('fs')
const util = require('util');
var MongoClient = require('mongodb').MongoClient

exports.readFile = util.promisify(fs.readFile)
exports.queryDB = function (query, url, db, collection) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, connectedDB) {
            if (err) {
                reject(err)
                return
            }
            var dbo = connectedDB.db(db)
            dbo.collection(collection).find(query).toArray(function (err, result) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
                connectedDB.close()
            })
        })
    })
}