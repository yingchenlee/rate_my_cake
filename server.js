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
    cmt : {type: String }
})
const CakeSchema = new mongoose.Schema({
    name: { type: String },
    imgurl: { type: String},
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

// app.post('/review/:id', function (req, res) {
//     var rviewInstance = new Review ( req.body );
//     console.log(req.body, "******************************req");
//     rviewInstance.save(function (err){
//         if (err) {
//             res.json({status: "error creating document in DB", err: err});
//         }
//         else {
//             res.json({status: "Success adding document to DB", data: rviewInstance});
//             Cake.findOneAndUpdate(req.params.id, {$push: {reviews:{rate: rviewInstance.rate, cmt: rviewInstance.cmt}}}, function(err, data){
//                 if(err){
//                     console.log("document not found in db");
//                     res.json({err: err});
//                 }
//                 else{
//                     console.log("successfully updated");
//                 }
//             })
//         }
//     })

// })

// app.get('/gold/:id', function (req, res) {
//     Ninja.findById(req.params.id, function (err, dbNinjas) {
//         if (err) {
//             console.log('Something has gone wrong');
//             res.redirect('/show/:id')
//         }
//         else {
//             res.json({ message: "Success", Ninja: dbNinjas });
//         }
//     })
// })
// app.put('/task/:id', function(req, res){
//     Ninja.update({ _id: req.params.id }, {name: req.body.name, hobby: req.body.hobby}, function (err, Ninjas){
//         if (err) {
//             console.log('Something has gone wrong');
//             res.json({ message: "Error", err: err })
//         }
//         else {
//             res.json({ message: "Success", Ninja: Ninjas });
//         }
//     })
// })
// app.delete('/task/:id', function (req, res) {
//     Ninja.remove({ _id: req.params.id }, function (err, dbNinjas) {
//         if (err) {
//             console.log('Something has gone wrong');
//             res.json({ message: "Error", err: err })
//         }
//         else {
//             res.json({ message: "Success", Ninja: dbNinjas })
//         }
//     })
// })

app.listen(8000, function () {
    console.log("listening on port 8000");
})