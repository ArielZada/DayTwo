function executeInTime(id, targetTime, task) {
    const {delayInMicroseconds, delayInSeconds} = timeLeft(targetTime);
    console.info(`executing message ${id} in ${delayInSeconds} seconds`);
    setTimeout(async () => {
        try {
            await task(id);
        } catch (e) {
            console.error(e.message);
        }
    }, delayInMicroseconds);
    return delayInSeconds;
}

function timeLeft(targetTime) {
    const now = new Date();
    const delayInMicroseconds = targetTime - now;
    const delayInSeconds = delayInMicroseconds / 1000;
    return {delayInMicroseconds, delayInSeconds}
}

module.exports = {
    executeInTime,
    timeLeft
}