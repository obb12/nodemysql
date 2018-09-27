//require the just installed express app
var task = ["buy socks", "practise with nodejs"];

var express = require('express');
//then we call express
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "homestead",
  port:33060,
  password: "secret",
  database: "nodejs"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//takes us to the root(/) URL
//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.addtask;
//add the new task from the post route into the array
var sql = "INSERT INTO todos (todotext) VALUES ?";
console.log(newTask);
var values = [
[newTask]
];
con.query(sql, [values], function (err, result) {
if (err) throw err;
console.log("Number of records inserted: " + result.affectedRows);
  res.redirect("/");
});
//after adding to the array go back to the root route

});
//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function(req, res) {
  con.query("SELECT * FROM todos", function (err, result, fields) {
  if (err) throw err;
    res.render("index", { task: result});
});

});
//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
