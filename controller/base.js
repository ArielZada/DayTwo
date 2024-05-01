const router = require('./router')
const {ENDPOINTS} = require('../config');
const baseService = require('../services/baseService')
const {getStatus} = require("../services/serviceError");

router.get(`/${ENDPOINTS.BASE}`, async (req, res, next) => {
    try {
        const timers = await baseService.getAll();
        res.send(timers);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

router.post(`/${ENDPOINTS.BASE}`, async (req, res, next) => {
    try {
        const params = req.body;
        console.log(`parameters sent from client, ${params}`);
        const timer = await baseService.sendMessage(params);
        res.send(timer);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

module.exports = router;

