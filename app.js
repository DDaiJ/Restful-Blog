var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

// app config
mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// Restful routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/blog/new", function(req, res) {
    res.render("new");
})

//CREATE ROUTE

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is connected");
});