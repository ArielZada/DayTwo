const db = require('./dbConnection');

const provider = db.provider;
const baseSchema = provider.Schema({
    timerID: {
        type: String,
        required: true,
        trim: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        trim: true
    }
});

baseSchema.plugin(db.timestamp);
const Base = provider.model('Base', baseSchema);
module.exports = Base;
