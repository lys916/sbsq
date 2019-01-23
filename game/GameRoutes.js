const express = require('express');
// const stripe = require("stripe")("sk_test_5XOQ1slHb1beF5FTI6i869at");
const mongoose = require('mongoose');
const gameRouter = express.Router();
const Game = require('./GameModel.js');


const buildSquares = (sq)=>{
  const squares = {};
  for(let i = 0; i < sq; i++){
    if(i < 10){
      squares['0'+i.toString()] = {name: null}
    }else{
      squares[i.toString()] = {name: null}

    }
  }
  return squares;
}

const game = {
  teams: ['PATRIOTS', 'RAMS'],
  patsNum: [null, null, null, null, null, null, null, null, null, null ],
  ramsNum: [null, null, null, null, null, null, null, null, null, null ],
  squares: buildSquares(100)
}

// const CustomFood = require('./CustomFoodModel');

gameRouter.get('/', function(req, res){
  Game.find({}).then(game=>{
    console.log('get game', game.length);
    res.json(game[0]);
  });
});

gameRouter.post('/pickSq', function(req, res){
	const {sq, user} = req.body
  const key = 'squares' + '.' + sq + '.name';
	console.log('picking sq', user);
  Game.findById('5c47991c8b96ef4ef44d6a94').then(game=>{
    if(!game.squares[sq].name){
      console.log(key);
			Game.findByIdAndUpdate('5c47991c8b96ef4ef44d6a94', {$set: {[key]: user.initials}}, {'new': true}).then(updated=>{
        res.json(updated);
      });
    }else{
			console.log('sq filled');
      if(game.squares[sq].name === user.initials){
          Game.findByIdAndUpdate('5c47991c8b96ef4ef44d6a94', {$set: {[key]: null}}, {'new': true}).then(updated=>{
          res.json(updated);
        });
      }else{
        res.json('taken');
      }
    }
  });

		
});

gameRouter.post('/changeTeamNum', function(req, res){
  const {num, team, index} = req.body
  const key = team + '.' + index;
  Game.findByIdAndUpdate('5c47991c8b96ef4ef44d6a94', {$set: {[key]: num}}, {'new': true}).then(updated=>{

    console.log('updated', updated);

  });
});

gameRouter.post('/updateScores', function(req, res){
  Game.findByIdAndUpdate('5c47991c8b96ef4ef44d6a94', {$set: {score: req.body.score, time: req.body.time}}, {'new': true}).then(updated=>{

    console.log('updated', updated.score, updated.time);
    res.json('updated');
  });
});
// customFoodRouter.post('/updateFood', function(req, res){
//     console.log('updating custom food', req.body);
// 	CustomFood.findByIdAndUpdate(req.body._id, req.body, {new: true}).then(updated => {
// 		res.json(updated);
// 	});
// });

// customFoodRouter.get('/getFoods', function(req, res){
//     const {userId} = req.query;
//     console.log('get custom foods id', userId);
// 	CustomFood.find({user: userId}).then(post => {
// 		res.json(post);
// 	});
// });

// customFoodRouter.delete('/deleteFood', function(req, res){
//     const {id} = req.query;
// 	CustomFood.findByIdAndRemove(id).then(deleted => {
// 		res.json(deleted);
// 	});
// });

// postRouter.get('/', function(req, res){
// 	const search =  req.query.search;
// 	if(search){
// 		const filter = new RegExp(search, 'i');
// 		Post.find({$or : [{title: filter}, {cuisine: filter}, {tags: filter}]})
// 		.populate('user', 'name')
// 		.then(posts => {
// 			res.json(posts);
// 		})
// 	} 
// });

// postRouter.get('/:id', function(req, res){
// 	const id = req.params.id;
// 	// find posts that owns by the people 'id user' is following...
// 	if (id){
// 		User.findById(id).then(user => {
// 			Post.find({ 'user' : { $in: user.following } })
// 			.sort({createdOn: -1})
// 			.populate('user')
// 			.then(posts => {
// 				console.log('res posts', posts);
// 			res.json(posts);
// 		})	
// 		});
		
// 	}
// });

// postRouter.post('/', function(req, res){
// 	console.log(req.body);
// 	// Post.find().then(posts => {
// 	// 	res.json(posts);
// 	// });
// });

module.exports = gameRouter;
