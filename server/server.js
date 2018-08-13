const express = require('express');
const app = express();
const path = require('path');
// const messageController = require('./messages/messageController');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const MLAB_API = 'mongodb://Dave:goodDogs@ds139970.mlab.com:39970/bestinshow';

const Picture = require('./pictureModel');
const User = require('./userModel');

mongoose.connect(MLAB_API);
mongoose.connection.once('open', (err, client) => {
  console.log('Connected with MLab');
});

function getAllImagesFromServer(req, res) {
	console.log('Get all images from server');
	Picture.find({}, (err, docs) => {
		console.log('All images find Err', err);
		console.log('All images find Docs', docs);
		res.json(docs);
	});
};

function addImageToServer(req, res) {
  console.log('Add Image to server request body',req.body);

  Picture.create(
  	{ imageLink: req.body.imageUrl,
      numLikes: 0,
      rank: req.body.imageRank,
      user: 'Zach'}, (err, data) => {
	  if (err) console.log(err);
	  else console.log('Successfully added image to database', data);
	  res.json(data);
	});
};

function addLikeToImage(req, res) {
	console.log('Add Like to Image on Server request body',req.body);

	// Picture.findByIdAndUpdate(req.body.imageId, { $inc: { numLikes: 1 }}, {new: true}, (err, docs) => {
	// 	if (err) console.log(err);
	// 	else console.log('Successfully found and updated image with id', req.body.imageId);
	// 	res.json(docs);
	// })

	let findAndIncOrDecElem = (docs, searchId, addOrDecVal) => {
		for (let i = 0; i < docs.length; i += 1) {
			if (docs[i]._id.toString() === searchId) {
				console.log('Found Id');
				docs[i].numLikes += addOrDecVal;
				return docs;
			}
		}
		console.log('Found Nothing');
		return docs;
	}
	// let checkForSorted = (docs) => {
	// 	for (let i = 0; i < docs.length - 1; i += 1) {
	// 		if (docs.)
	// 	}
	// }

	Picture.find({}, (err, docs) => {
		docs = findAndIncOrDecElem(docs, req.body.imageId, 1);
		console.log('Docs after inc',docs);
		docs.sort((a, b) => b.numLikes - a.numLikes);
		newRank = docs.map((elem, ind) => {return {id: elem._id, newRank: ind, likes: elem.numLikes};});
		console.log('New Rank', newRank);
		let updates = [];

		newRank.forEach((item) => {
			// console.log(item.id, 'and', req.body.imageId);
			// console.log(item.id.toString() === req.body.imageId);
			if (item.id.toString() === req.body.imageId) {
				var updatePromise = Picture.findByIdAndUpdate(item.id, 
					{ $inc: { numLikes: 1 }, "$set": { "rank": item.newRank }},
					{new: true}
				);
			} else {
		    	var updatePromise = Picture.findByIdAndUpdate(item.id, 
		    		{ "rank": item.newRank }, 
		    		{new: true}
		    	);
	    	}
	    	updates.push(updatePromise);
		});

		Promise.all(updates).then((results) => {
		    // console.log('Got all updates back', results);
		    res.json(results);
		});
	});
}

function addUserToDatabase (req, res) {
  console.log('Add user to database request body',req.body);

  User.create(
  	{ username: req.body.username,
      password: req.body.password}, (err, data) => {
	  	if (err) console.log(err);
	  	else console.log('Successfully added image to database', data);
	  	res.json(data);
	});
}

function logUserIn (req, res) {
  console.log('Signing In User', req.body);
  User.find({}, (err, users) => {
  	console.log('All user find Err', err);
	console.log('All user find Docs', users);
	let usernameMatch = users.find((userObj) => {userObj.username === req.body.username});
	console.log('usernameMatch', usernameMatch);
	if (usernameMatch === undefined) {
		// Do fake hash
		return res.send({error: 'No matching username and password found'});
	}
	if (usernameMatch.password !== req.body.password) return res.send({error: 'No matching username and password found'});

	res.json(usernameMatch);
  });
}

// function sendAnything(req, res, next) {
// 	// console.log('Hello');
// 	res.send(JSON.stringify({'a': 1}));
// };

// app.use(express.static(path.join(__dirname, './../client')));
app.use(bodyParser.json());
app.use(express.static(__dirname + './../dist'));

// place routes here
// app.get('/client/styles.css', (req, res) => {
// 	res.sendFile(__dirname + "./../dist/style.css");
// })

app.get('/images', getAllImagesFromServer);
app.post('/images', addImageToServer);
app.post('/like', addLikeToImage);
app.post('/signUp', addUserToDatabase);
app.post('/userLogin', logUserIn);

// app.post('/messages', 	messageController.verifyUser, messageController.postMessage);


app.listen(3000);

module.exports = app;
