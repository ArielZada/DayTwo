const mongoose = require('mongoose');
const config = require('../config');
const timestamp = require('mongoose-timestamp');

module.exports.connectToDb = async () => {
    try {
        await mongoose.connect(config.API.MONGODB_URI);
        console.log('connected to DB')
        return true;
    } catch (e) {
        console.log(`Error on DB connection: ${e.message}. Make sure the password is correct and well set as env variable`);
        return false;
    }
}

module.exports.provider = mongoose;
module.exports.timestamp = timestamp;