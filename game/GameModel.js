const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema({
	teams: [{type: String, required: true}],
	patsNum: [{type: String}],
	ramsNum: [{type: String}],
	score: [{type: String}],
	time: [{type: String}],
    squares: mongoose.Schema.Types.Mixed
});

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;