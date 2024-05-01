const router = require('./router')
const {ENDPOINTS} = require('../config');
const timerService = require('../services/timersService')
const {getStatus} = require("../services/serviceError");

router.get(`/${ENDPOINTS.TIMERS}`, async (req, res,next) => {
    try {
        const timers = await timerService.getAllTimers();
        res.send(timers);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

router.get(`/${ENDPOINTS.TIMERS}/:id`, async (req, res,next) => {
    try {
        const id = req.params.id;
        const timer = await timerService.getTimer(id);
        res.send(timer);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

router.post(`/${ENDPOINTS.TIMERS}`, async (req, res,next) => {
    try {
        const params = req.body;
        timerService.validateTimeParams(params)
        const timer = await timerService.sendMessage(params);
        res.send(timer);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

module.exports = router;

