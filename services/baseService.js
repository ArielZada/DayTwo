const baseModel = require('../db/baseModel');
const {ServiceError} = require("./serviceError");

async function sendMessage(params) {
    console.log(`parameters sent from client, ${params}`);
    try {
        return await baseModel.create(params);
    } catch (e) {
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

async function getAll() {
    try {
        return await baseModel.find({});
    } catch (e) {
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

module.exports = {
    sendMessage,
    getAll
};
