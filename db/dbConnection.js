const mongoose = require('mongoose');
const config = require('../config');
const timestamp = require('mongoose-timestamp');

module.exports.connectToDb = async () => {
    try {
        await mongoose.connect(config.API.MONGODB_URI)
        console.log('connected to DB')
    } catch (e) {
        console.log('Error on DB connection:', e.message)
    }
}

module.exports.provider = mongoose;
module.exports.timestamp = timestamp;