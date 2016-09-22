var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/local';

router.get('/', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('chuck_noris', {strict: true}, function (err, col) {
            assert.equal(null, err);
            col.find().toArray(function (err, docs) {
                assert.equal(null, err);
                res.json(docs);
                db.close();
            });
        });
    });
});

module.exports = router;