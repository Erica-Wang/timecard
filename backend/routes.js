const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId; 


const app = express();
const routes = express.Router();

routes.route('/').get((req,res)=>{
	res.send('hello world');
});

//if auth = true, authenticated
//if auth = false, failed
routes.route('/workerLogIn').get((req,res)=>{
	var id = req.body.id;
	var pass = req.body.password;
	const hash = crypto.createHash('sha256').update(pass).digest('base64');
	var auth = "false";
	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("test");
	  dbo.collection("workerAccounts").find({}).toArray(function(err, result) {
	    if (err){ 
	    	res.json({"status":"fail"});
	    	throw err;
	    	return;
	    }
	    for(var i = 0; i<result.length; i++){
	    	if(result[i]['ID']==id&&result[i]['password']==hash){
	    		auth = "true"
	    	}
	    }
	    db.close();
		res.json({auth:auth});
	  });
	});
})

routes.route('/managerLogIn').get((req,res)=>{
	var id = req.body.id;
	var pass = req.body.password;
	const hash = crypto.createHash('sha256').update(pass).digest('base64');
	var auth = "false";
	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("test");
	  dbo.collection("managerAccounts").find({}).toArray(function(err, result) {
	    if (err){ 
	    	res.json({"status":"fail"});
	    	throw err;
	    	return;
	    }
	    console.log(result);
	    for(var i = 0; i<result.length; i++){
	    	if(result[i]['ID']==id&&result[i]['password']==hash){
	    		auth = "true"
	    	}
	    }
	    db.close();
		res.json({auth:auth});
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

routes.route('/assignTask').post((req,res)=>{
	var notes = req.body.notes;
	var manager = req.body.managerID;
	var worker = req.body.workerID;
	var taskID = new ObjectId(req.body.id);
	console.log(notes);

	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myquery = {_id:taskID};
		var newvalues = { $set: {managerAssigned: manager, workerAssigned: worker, notes: notes } };
		dbo.collection("tasks").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log(res);
			db.close();
		});
	});
	res.json();
})


module.exports = routes;