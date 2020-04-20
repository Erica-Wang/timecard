const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');


const app = express();
const routes = express.Router();

routes.route('/').get((req,res)=>{
	res.send('hello world');
});

//if auth = true, authenticated
//if auth = false, failed
routes.route('/workerLogIn').get((req,res)=>{
	var id = "STE001";
	var pass = "abdd";
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
	var id = "STE001";
	var pass = "abdd";
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




module.exports = routes;