const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const PickSchema = new mongoose.Schema({
    user: {type: ObjectId, ref: 'User'},
    rams: {type: string, required: true},
    patriots: {type: string, required: true},
    winner: {type: Boolean, default: false},

    // guestInfo: mongoose.Schema.Types.Mixed,
    // items: [mongoose.Schema.Types.Mixed],
    // protein: {type: Number, required: true},
    // amount: {type: Number, required: true},
    // active: {type: Boolean, default: false},
    // editing: {type: Boolean, default: false},
    
	createdOn: {type: Date, default: Date.now}
});

const PickModel = mongoose.model('Pick', PickSchema);

module.exports = PickModel;


