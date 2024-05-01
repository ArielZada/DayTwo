const timerService = require("../services/timersService");
const scheduler = require("../utils/taskSchedueler");

async function loadAllMessages() {
    console.log('Running loadAllMessages job')
    try {
        const timers = await timerService.getAllPendingTimers();
        timers.forEach((timer) => {
            const timerObject = timer.toObject();
            scheduler.executeInTime(timerObject._id, timerObject.executionTime, timerService.sendMessageToBase)
        });
        console.info(`loadAllMessages job Finished with ${timers?.length} messages`);
    } catch (e) {
        console.error(`Error on loadAllMessages job, ${e.message}`);
    }
}

module.exports = loadAllMessages;