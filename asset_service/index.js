var express = require('express');
var morgan = require('morgan');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();
app.use(morgan('dev'));

console.log("--- Images Service---");
console.log("Connecting to customer repository...");

// Connection URL
var url = 'mongodb://asset_mapping:27017/user';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    // console.log(err);
    assert.equal(null, err);
    console.log("Connected correctly to server");

    app.get('/', (req, res, next) => {

        var uname = req.query.uname;
        if (!uname) {
            throw new Error("When searching for a user, the email must be specified, e.g: '/?username==alice'.");
        }

        db.collection('userProfile').find({
            uname: uname,
        }).toArray(function(err, docs) {
            assert.equal(err, null);
            assert.equal(1, docs.length);

            res.status(200).send({
                profile_image: docs[0].profile_image,
            });
        });
    });

    var server = app.listen(8122);
});