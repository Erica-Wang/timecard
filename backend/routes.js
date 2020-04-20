const express = require('express');
const MongoClient = require('mongodb').MongoClient;


const app = express();
const routes = express.Router();

routes.route('/').get((req,res)=>{
	res.send('hello world');
});

routes.route('/workerLogIn').get((req,res)=>{
	var id = req.body.id;
	var pass = req.body.password;

	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("workerAccounts");
	  dbo.collection("tasks").find({}).toArray(function(err, result) {
	    if (err){ 
	    	res.json({status: 'error'});
	    	throw err;
	    }
	    console.log(result);
	    res.json(result);
	    db.close();
	  });
	});

})

routes.route('/managerGetTasks').get((req,res)=>{
	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("test");
	  dbo.collection("tasks").find({}).toArray(function(err, result) {
	    if (err){ 
	    	res.json({status: 'error'});
	    	throw err;
	    }
	    console.log(result);
	    res.json(result);
	    db.close();
	  });
	});
	
});




module.exports = routes;