const timersModel = require('../db/timers/timersModel');
const superheroesService = require('./superheroesService');
const timersUtils = require('../db/timers/timersDbUtils');
const scheduler = require('../utils/taskSchedueler');
const request = require('../utils/request');
const {API} = require('../config');
const {ServiceError, BadInputError, BadMessageToBase, BadIDError} = require("./serviceError");

async function sendMessageToBase(id) {
    console.log(`Job executed! for id ${id}`);
    const timer = await timersModel.findOne({_id: id});
    if (!timer) {
        throw new BadIDError(id);
    }
    const timerObject = timer.toObject();
    try {
        const hero = await superheroesService.getHero(timerObject.sender);
        const baseReqObject = {senderName: hero.alias, timerID: id, message: timerObject.message}
        await request.insertData(timerObject.url, baseReqObject);
        await timersModel.updateOne({_id: id}, {$set: {status: timersUtils.timerStatuses.DONE}});
        console.log(`Updated Status success! message ${id} has reached the Base!`);
    } catch (e) {
        console.error(`Error occured in send message to base, canceling message id ${id}`)
        await timersModel.updateOne({_id: id}, {$set: {status: timersUtils.timerStatuses.CANCELED}});
        if (BadMessageToBase.errorCodes.includes(e.code)) {
            const message = `the URL provided ${timerObject.url} for message id ${id} was bad, message is canceled`;
            throw new BadMessageToBase(message)
        }
        if (e instanceof BadIDError) {
            throw e;
        }
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

async function getAllTimers() {
    try {
        const timers = await timersModel.find({});
        return timers;
    } catch (e) {
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

/*
The service fetches the data every three minutes only for the messages which have less than 3 minutes
in order to not overload the system with a lot of data
 */
async function getAllPendingTimers() {
    try {
        const now = new Date();
        const minutesFromNow = new Date(now.getTime() + API.DB_FETCH_WAIT_IN_MINUTES * 60000);
        const pendingTimers = await timersModel.find({
            status: timersUtils.timerStatuses.PENDING,
            executionTime: {$lt: minutesFromNow}
        });
        return pendingTimers;
    } catch (e) {
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

async function getTimer(id) {
    try {
        const timer = await timersModel.find({_id: id});
        if (!timer || timer.length === 0) {
            throw new BadIDError(id);
        }
        const timerObject = timer[0].toObject();
        let {delayInSeconds} = scheduler.timeLeft(timerObject.executionTime);
        return {timeLeft: delayInSeconds < 0 ? 0 : delayInSeconds, messageId: timerObject._id};
    } catch (e) {
        if (e.kind !== e.valueType) {
            throw new BadIDError(e.value);
        }
        if (e instanceof BadIDError){
            throw e;
        }
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

async function sendMessage(params) {
    console.log(`parameters sent from client, ${params}`);
    const {hours, minutes, seconds} = params;
    try {
        const sender = params.sender;
        const hero = await superheroesService.getHero(sender);
        const now = params.createdAt;
        const executionTime = new Date(now.getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000);
        const timerParams = {
            sender: params.sender,
            url: params.url,
            message: params.message,
            executionTime,
        }
        console.info(`Hero ${hero.alias} sending a message to base!`);
        const timers = await timersModel.create(timerParams);
        const messageId = timers?._id.toString();
        const {delayInSeconds} = scheduler.timeLeft(executionTime);
        const timeLeft = delayInSeconds < (API.DB_FETCH_WAIT_IN_MINUTES * 60) ? scheduler.executeInTime(messageId, executionTime, sendMessageToBase) : delayInSeconds
        return {timeLeft, messageId};
    } catch (e) {
        e.message = `Error while sending message, ${e.message}`
        throw e;
    }

}

function validateParams(params) {
    const urlRegex = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i);
    const {hours, minutes, seconds, url, createdAt} = params;
    if (createdAt == null) {
        console.error(`error while checking createdAt, make sure req.createdAt exists`);
        throw new ServiceError(`Server could not accept the request`);
    }
    if (hours == null || hours < 0 || hours > 23) {
        throw new BadInputError(`Hours must be between 0 and 23, sent ${hours}`);
    }
    if (minutes == null || minutes < 0 || minutes > 59) {
        throw new BadInputError(`Minutes must be between 0 and 59, sent ${minutes}`);
    }
    if (seconds == null || seconds < 0 || seconds > 59) {
        throw new BadInputError(`Seconds must be between 0 and 59, sent ${seconds}`);
    }
    if (!API.BASE_URLS.includes(url)){
        const message = !urlRegex.test(url) ? `url must be a valid url, sent ${url}` :
            `you provided with the wrong bse url! contact the base for the right one`;
        throw new BadInputError(message);
    }

}

module.exports = {
    sendMessageToBase,
    getAllTimers,
    getAllPendingTimers,
    getTimer,
    sendMessage,
    validateParams
};
