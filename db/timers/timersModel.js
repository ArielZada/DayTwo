const db = require('../dbConnection');
const utils = require('./timersDbUtils');
const provider = db.provider;
const URL_REGEX = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i)

const timersSchema = provider.Schema({
    sender: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: [true, "url is required"],
        trim: true,
        validate: [(value) => { return value.match(URL_REGEX); }, "expression is not correct for URL"]

    },
    executionTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: utils.timerStatuses.PENDING
    }
});

timersSchema.plugin(db.timestamp);
const Timers = provider.model('Timers', timersSchema);
module.exports = Timers;
