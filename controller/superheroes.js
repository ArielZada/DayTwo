const router = require('./router')
const {ENDPOINTS, statuses} = require('../config');
const heroesService = require('../services/superheroesService');
const {getStatus} = require("../services/serviceError");

router.get(`/${ENDPOINTS.SUPERHEROS}`, async (req, res) => {
    const onlyId = req.query?.onlyid === "true";
    const select = onlyId ? '_id alias' : '';
    try {
        const heroes = await heroesService.getAll(select);
        console.log(`heroes sent to client, ${heroes}`);
        res.send(heroes);
    } catch (e) {
        console.error('Error while fetching heroes:', e);
        res.status(statuses.SERVER_ERROR.STATUS_CODE_INTERNAL_SERVER_ERROR).send(e.message);
    }
});

router.get(`/${ENDPOINTS.SUPERHEROS}/:id`, async (req, res, next) => {
    try {
        const id = req.params.id;
        const hero = await heroesService.getHero(id);
        console.log(`hero sent to client, ${hero}`);
        res.send(hero);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

router.post(`/${ENDPOINTS.SUPERHEROS}`, async (req, res, next) => {
    try {
        const params = req.body;
        console.log(`parameters sent from client, ${params}`);
        const hero = await heroesService.add(params);
        res.send(hero);
    } catch (e) {
        const status = getStatus(e);
        res.status(status).json({error: e.message});
        return next(e);
    }
});

module.exports = router;

