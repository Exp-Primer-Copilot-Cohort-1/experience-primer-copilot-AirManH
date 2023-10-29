// Create web server
var express = require('express');
var app = express();
var path = require('path');
// Create connection to database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'comments'
});

// Connect to database
connection.connect(function(err){
	if(err){
		console.log('Error connecting to database');
		return;
	}
	console.log('Connection established');
});

// Serve static files
app.use(express.static('public'));

// Get all comments
app.get('/getComments', function(req, res){
	connection.query('SELECT * FROM comments', function(err, rows, fields){
		if(err) throw err;
		res.send(rows);
	});
});

// Insert new comment
app.get('/insertComment', function(req, res){
	var comment = req.query.comment;
	var query = 'INSERT INTO comments (comment) VALUES ("' + comment + '")';
	connection.query(query, function(err, rows, fields){
		if(err) throw err;
		res.send('Comment inserted');
	});
});

// Delete comment
app.get('/deleteComment', function(req, res){
	var comment = req.query.comment;
	var query = 'DELETE FROM comments WHERE comment = "' + comment + '"';
	connection.query(query, function(err, rows, fields){
		if(err) throw err;
		res.send('Comment deleted');
	});
});

// Start server
app.listen(3000, function(){
	console.log('Listening on port 3000');
});