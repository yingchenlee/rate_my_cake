var express = require("express");
var session = require('express-session');
var app = express();
var mongoose = require("mongoose");


var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
mongoose.connect('mongodb://localhost/ninjaGold', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var NinjaSchema = new mongoose.Schema({
    name: { type: String },
    gold: { type: Number}
}, { timestamps: true })
var Ninja = mongoose.model("Ninja", NinjaSchema);


app.use(bodyParser.json());

app.get('/gold', function (req, res) {
    Ninja.find({}, function (err, Ninjas) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", Ninja: Ninjas })
        }
    })
})

app.get('/farmGold', function(req,res){
    Ninja.findById('5c47b71d0fd22d84b57afa89', function(err,ninja){
        if (err){
            res.json({message:"err"})
        }
        else{
            res.json({message:'success', ninja: Math.random()*3+2})
        }
    })
})
app.get('/caveGold', function(req,res){
    Ninja.findById('5c47bcd5e15a718628b80e0b', function(err,ninja){
        if (err){
            res.json({message:"err"})
        }
        else{
            res.json({message:'success', ninja: Math.random()*5+5})
        }
    })
})
app.get('/houseGold', function(req,res){
    Ninja.findById('5c47bcd5e15a718628b80e0b', function(err,ninja){
        if (err){
            res.json({message:"err"})
        }
        else{
            res.json({message:'success', ninja: Math.random()*8+7})
        }
    })
})
app.get('/casinoGold', function(req,res){
    Ninja.findById('5c47bcd5e15a718628b80e0b', function(err,ninja){
        if (err){
            res.json({message:"err"})
        }
        else{
            res.json({message:'success', ninja: Math.random()*-200+100})
        }
    })
})
app.post('/gold', function (req, res) {
    console.log("POST DATA", req.body);
    var newNinja = new Ninja({
        name: req.body.name,
        gold: req.body.gold
    });
    newNinja.save(function (err, dbNinjas) {
        if (err) {
            console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.json({ message: "Success", Ninja: dbNinjas });
        }
    })
})
app.get('/gold/:id', function (req, res) {
    Ninja.findById(req.params.id, function (err, dbNinjas) {
        if (err) {
            console.log('Something has gone wrong');
            res.redirect('/show/:id')
        }
        else {
            res.json({ message: "Success", Ninja: dbNinjas });
        }
    })
})
app.put('/task/:id', function(req, res){
    Ninja.update({ _id: req.params.id }, {name: req.body.name, hobby: req.body.hobby}, function (err, Ninjas){
        if (err) {
            console.log('Something has gone wrong');
            res.json({ message: "Error", err: err })
        }
        else {
            res.json({ message: "Success", Ninja: Ninjas });
        }
    })
})
app.delete('/task/:id', function (req, res) {
    Ninja.remove({ _id: req.params.id }, function (err, dbNinjas) {
        if (err) {
            console.log('Something has gone wrong');
            res.json({ message: "Error", err: err })
        }
        else {
            res.json({ message: "Success", Ninja: dbNinjas })
        }
    })
})

app.listen(8000, function () {
    console.log("listening on port 8000");
})