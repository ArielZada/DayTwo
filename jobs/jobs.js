const cron = require('node-cron');
const loadAllMessages = require('./messageJobs');
const {API} = require('../config')
const cronSchedule = `*/${API.DB_FETCH_WAIT_IN_MINUTES} * * * *`;

async function runJobs() {
    console.log('Running all jobs');
    await loadAllMessages();
    runScheduleJobs();
}
function runScheduleJobs() {
    cron.schedule(cronSchedule, loadAllMessages);
}
module.exports.runJobs = runJobs;