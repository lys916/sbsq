const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	initials: {type: String, required: true},
	password: {type: String, required: true},
	picks: [{type: ObjectId, ref: 'Pick'}],
	availablePicks: {type: Number, default: 0},
	admin: {type: Boolean, default: false}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;