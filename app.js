//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
var _ = require('lodash');
const mon = require("mongoose");
const { default: mongoose } = require("mongoose");


const homeStartingContent = "Welcome to this public blog website. Post about your passion, interest, skills, a new technology you learned or about your day etc. etc. This blog website allows you to open up about yourself to others without actually mentioning about yourself. Keep the blogs entertaining or education but at the same time be mindful of the language being used. Explore yourself. Explore your thoughts and imaginations and post it here for others to a part of it too at the same time be a part of others thoughts and imaginations. It is all fun sharing Jokes or educational content. Learn and teach. Grow in your life. Enjoy the process. Cheers!! "
// "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =" We are a group of web developers trying to create simple websites for public use. This website specifically mentions about blogs of different level. It allows users to just put out their thought for others to read and react. If you want a website for your business, do contact us. Thank you!";
const contactContent = " Phone : 8303410362         Email: svaibhav407@gmail.com          Address: ParkStreet, near Hanuman Mandir, New Delhi, India ";

mon.connect('mongodb+srv://svaibhav407:Moon%4053425@cluster0.t3fgp.mongodb.net/myapp', {useNewUrlParser: true});

const app = express();
var posts ;
app.set('view engine', 'ejs');

const postSchema = new mongoose.Schema({
  title : {type: String, required : true},
  content : {type: String, required : true}
});

const Post = new mongoose.model("Post", postSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Post.find({}, function(err, postt){
    if(err) console.log(err);
    else{
      posts = postt;
      res.render("home", { content: homeStartingContent, postss: posts });
    }
  })
  // res.render("home", { content: homeStartingContent, postss: posts });
})

app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
})

app.get("/compose", function (req, res) {
  res.render("compose");
})

app.get("/posts/:title", function (req, res) {
  //console.log(req.params.title);

  posts.forEach(function (data) {
    if (_.lowerCase([string = req.params.title]) == _.lowerCase([string = data.title])) {
     // console.log("match found");
     res.render("post", { title: data.title, content: data.content});
     
    }
  })

})

app.post("/compose", function (req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
   const postob = new Post(post);
   postob.save();
  res.redirect("/");
})







app.listen(3000, function () {
  console.log("Server started on port 3000");
});
