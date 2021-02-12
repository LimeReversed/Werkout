const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    routinesId: String,
    historyId: String 
});

module.exports = mongoose.model('user', userSchema);