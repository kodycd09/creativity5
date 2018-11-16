var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/requestDB',{ useNewUrlParser: true }); //Connects to a mongo database called "requestDB"

var requestSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Request: String,
    Duration: Number
});

var Request = mongoose.model('Request', requestSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* POST comments to database */
router.post('/request', function(req, res, next) {
    console.log("POST request route"); 
    console.log(req.body);
    var newcomment = new Request(req.body); 
    console.log(newcomment); 
    newcomment.save(function(err, post) { 
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/getRequests', function(req, res, next) {
    console.log("In the GET route");
    Request.find(function(err,requestList) {
        if (err) return console.error(err);
        else {
            console.log(requestList);
            res.json(requestList);
        }
    })
});

/* GET comments by name from database */
router.delete('/deleteRequest', function(req, res, next) {
    console.log("In the deleteRequest route");
    console.log(req.body);
    db.collection("requests").remove( req.body, true, function(err, obj) {
        if (err) return console.error(err);
        else {
            console.log(obj);
            res.json(obj);
        }
    });
});

/* DELETE ALL comments from database */
router.delete('/deleteAllRequests', function(req, res, next) {
   console.log("In the DELETE route"); 
   db.collection("requests").deleteMany( {} /*req.body*/, function(err, obj) {
        if (err) return console.error(err);
        else{
            res.json(obj);
        }
   });
});

module.exports = router;
