const express = require('express');
const User = require('./UserModel.js');
const userRouter = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

userRouter.post('/signup', function(req, res){
	const { initials, password, name } = req.body;
	console.log('body..', req.body);
	User.find({initials}).then(userFound=>{
		console.log('user found', userFound);
		if(userFound.length > 0){
			res.json({errorMessage: 'Initials taken, try a different one'})
		}else{
			const user = new User();
			user.initials = initials;
			user.name = name;
			user.password = password;
			console.log('user', user);
			user.save().then(savedUser => {
					res.json(savedUser);
				});

			// bcrypt.hash(password, 11, (err, hash) => {
			// 	if (err) throw err;
			// 	user.password = hash;
			// 	user.save().then(savedUser => {
			// 		res.json(savedUser);
			// 	});
			// });
		}
	})
	
});

userRouter.post('/addSquare', function(req, res){
	User.findOne({initials: req.body.initials}).then(user => {
		console.log(user);
		if(user){
			const sq = Number(req.body.addSq);
			user.availablePicks = user.availablePicks + sq;
			user.save().then(saved=>{
				res.json('square added');
			});
		}else{
			res.json('user not found');
		}
		
	});
});

userRouter.post('/', function(req, res){
	User.find(req.body.id).then(user => {
		res.json(user);
	});
});

userRouter.post('/login', function(req, res){
	const { initials, password } = req.body;
	User.findOne({ initials }).then(user => {
		if(!user){
			res.json({errorMessage: 'Wrong initials or password'});
		}
		if(user){
			if(password !== user.password){
				res.json({errorMessage: 'Wrong initials or password'});
			}else{
				res.json(user);
			}
			// bcrypt.compare(password, user.password, function(err, valid) {
    		// 	if(!valid){
    		// 		res.json({errorMessage: 'Wrong username or password'});
			// 	}
			// 	console.log('pwd valid', true)
    		// 	const token = jwt.sign(user, 'This is a secret string', { expiresIn: '1h' });
        	// 	res.json({ token: token, username: user.name, email: user.email });
			// });
		}
	});
});

userRouter.put('/addGoal', function(req, res){
	const { goal, userId } = req.body;
	console.log('goal to update', goal)
	console.log('id to update', userId);
	User.findByIdAndUpdate(userId, goal, {new: true}, function(err, updated){
		if(err){console.log(err)}
		console.log('GOAL IS SET!', updated);
		res.json(updated);
	});
});

module.exports = userRouter;