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
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const ReviewSchema = new mongoose.Schema({
    rate : { type: Number },
    cmt : { type: String }
})
const CakeSchema = new mongoose.Schema({
    name: { type: String },
    imgurl: { type: String },
    reviews : [ReviewSchema]
}, { timestamps: true })
var Cake = mongoose.model("Cake", CakeSchema);
var Review = mongoose.model("Review", ReviewSchema);


app.use(bodyParser.json());
// create a cake
app.post('/create', function (req, res) {
    var newcake = new Cake (req.body);
    newcake.save(function (err, newcake) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        }
        else {
            // respond with JSON
            res.json({ message: "Success", Cake: newcake })
        }
    })
})

// get all cakes
app.get('/listall', (req, res)=> {
    Cake.find({}, function(err, cakes) {
        if(err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        } else {
            // console.log(cakes);
            res.json({message: "Success", data: cakes})
        }
    })
})

// rting
app.post('/review/:id', function (req, res) {
    var rviewInstance = new Review ( req.body );
    console.log(req.params.id, "******************************req");
    Cake.findOneAndUpdate({_id: req.params.id}, {$push: {reviews:{rate: rviewInstance.rate, cmt: rviewInstance.cmt}}}, function(err, data){
        if(err){
            console.log("document not found in db");
            res.json({err: err});
        }
        else{
            console.log("successfully updated rv");
            res.json({messeage: "Added review", data: data})
        }
    })  
})
// find One
app.get('/cake/:id', function (req, res){
    Cake.findById({_id: req.params.id}, function(err, data){
        if(err){
            res.json({err:err});
        }
        else {
            console.log('Found ONE');
            res.json({data: data});
        }
    })

})
// update worked
app.put('/update', function (req, res){
    console.log(req.body);
    Cake.findByIdAndUpdate(req.body._id, {$set: {name: req.body.name, imgurl: req.body.imgurl}}, function(err, data){
        if(err){
            console.log("document not found in db");
            res.json({err: err});
        }
        else{
            console.log("successfully updated");
            console.log(data);
            res.json({data:data})
        }
    })
})
// delete  ...
app.delete('/cake/:id', function (req, res){
    Cake.findOneAndDelete({_id:req.params.id}, function (err){
        if(err){
            res.json({err:err});
        } else {
            res.json({status: "Success deleting the object"});
        }
    })
})


app.listen(8000, function () {
    console.log("listening on port 8000");
})