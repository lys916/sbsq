const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema({
	teams: [{type: String, required: true}],
	patsNum: [{type: String}],
	ramsNum: [{type: String}],
	score: [{type: String}],
	time: [{type: String}],
    squares: mongoose.Schema.Types.Mixed,
	status: {type: String},
	q1Winner: {type: String},

	q2Winner: {type: String},

	q3Winner: {type: String},

	q4Winner: {type: String},

	q1WinnerRv: {type: String},

	q2WinnerRv: {type: String},

	q3WinnerRv: {type: String},

	q4WinnerRv: {type: String}

});

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;