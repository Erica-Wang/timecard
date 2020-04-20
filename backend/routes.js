const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId; 
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; 


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

routes.route('/employeeGetTasks').get((req,res)=>{
	var worker = req.body.workerID;
	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("test");
	  var query = {workerAssigned: worker};
	  dbo.collection("tasks").find(query).toArray(function(err, result) {
	    if (err){ 
	    	res.json({status: 'error'});
	    	throw err;
	    }
	    console.log(result);
	    return res.json(result);
	    db.close();
	  });
	});
});

routes.route('/getPossibleActivities').get((req,res)=>{
	var loc = req.body.loc;

	let rawdata = fs.readFileSync('locationActivityCode');
	let data = JSON.parse(rawdata);
	console.log(data);

	res.json(data[loc]);
});

routes.route('/completeTask').post((req,res)=>{
	//fill in a new entry
	var worker = req.body.id;
	var d = new Date();
	var date = d.getFullYear()+" "+(d.getMonth()+1)+" "+d.getDate();

	var jobCode = req.body.jobCode;
	var activityCode = req.body.activityCode;
	var rate = req.body.rate;
	var hrs = req.body.hrs;
	var overtime = req.body.overtime;
	var timeCode = req.body.timeCode;

	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("test");
	  var query = { id: worker, date: date};
	  //see if one already exists
	  dbo.collection("timecards").find(query).toArray(function(err, result) {
	    if (err){ 
	    	res.json({"status":"fail"});
	    	throw err;
	    	return;
	    }
	    var entries;
	    if(result.length==0){
	      //doesnt exist, add timecard
	      var myobj = { id: worker, date: date, validated: "False", entries:[] };
		  dbo.collection("timecards").insertOne(myobj, function(err, res) {
		    if (err) throw err;
		    console.log("1 document inserted");
	  	  	entries = [];
	  	  	//insert entry
		    insertEntry(worker, date, db, entries, jobCode, activityCode, rate, hrs, overtime, timeCode);
	  	  });
	    }else{
	    	//exists, just insert entry
	    	entries = result[0]['entries'];
	    	insertEntry(worker, date, db, entries, jobCode, activityCode, rate, hrs, overtime, timeCode);
	    	db.close();
	    }
	  });
	});
});

function insertEntry(worker, date, db, entries, jobCode, activityCode, rate, hrs, overtime, timeCode){
	var dbo = db.db("test");
	var query = {id: worker, date: date};
	console.log(query);
    dbo.collection("timecards").find(query).toArray(function(err, result) {
    	console.log(result);
    });
    entries.push({
    	jobCode: jobCode,
    	activityCode: activityCode,
    	rate: rate,
    	hrs: hrs,
    	overtime: overtime,
    	timeCode: timeCode
    });
    console.log(entries);
	var newvalues = { $set: {entries: entries } };
	dbo.collection("timecards").updateOne(query, newvalues, function(err, res) {
	  if (err) throw err;
	  console.log(res['result']['nModified']);
	  db.close();
	});
}

routes.route('/validateTimecard').post((req,res)=>{
	timecard = new ObjectId(req.body.id);
	MongoClient.connect(process.env.MONGO_URL, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myquery = {_id:timecard};
		var newvalues = { $set: {validated: "True"} };
		dbo.collection("timecards").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log(res);
			db.close();
		});
	});
	res.json();
});

module.exports = routes;

