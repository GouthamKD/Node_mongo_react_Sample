var express = require("express");
var path = require("path");
var mongo = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var db = require("./config.js");

var app = express();
var port = process.env.port || 7777;
var srcpath = path.join(__dirname, '/public');
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));


//To Avoid CORS exception..
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var studentSchema = new Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String },
    contact: { type: String },
}, { versionKey: false });


var model = mongoose.model('student', studentSchema, 'student');

//api for get data from database  
app.get("/api/getdata", function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})


//api for Delete data from database  
app.post("/api/Removedata", function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Deleted..!!" });
        }
    });
})


//api for Update data from database  
app.post("/api/Updatedata", function (req, res) {
    model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address, contact: req.body.contact, email: req.body.email },
        function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send({ data: "Record has been Updated..!!" });
        });
})


//api for Insert data from database  
app.post("/api/savedata", function (req, res) {

    var mod = new model(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Inserted..!!" });
        }
    });
})

// call by default index.html page  
// app.get("*", function (req, res) {
//     res.sendFile(srcpath + '/index.html');
//     console.log('Already loaded index file!!');
// })

//server stat on given port  
app.listen(port, function (err, res) {
    if (err) {
        console.log('Something went wrong while opening port!' + port);
        return;
    }
    console.log("server started on port" + port);

})  