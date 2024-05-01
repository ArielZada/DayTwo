const heroesModel = require('../db/superheroesModel');
const {ServiceError, DuplicateKeyError, BadIDError} = require("./serviceError");

async function getAll(select = '') {
    try {
        return await heroesModel.find({}).select(select);
    } catch (e) {
        throw new ServiceError(`Unknown Error: ${e.message}`);
    }
}

async function getHero(id) {
    try {
        const hero = await heroesModel.findById(id);
        if (hero == null) {
            throw new BadIDError(id);
        }
        return hero.toObject();
    } catch (e) {
        if (e instanceof BadIDError) {
            throw e;
        }
        if (e.kind !== e.valueType) {
            throw new BadIDError(e.value);
        } else {
            throw new ServiceError(`Unknown Error: ${e.message}`);
        }
    }
}

async function add(params) {
    try {
        return await heroesModel.create(params);
    } catch (e) {
        const code = e.code;
        if (code === DuplicateKeyError.errorCode) {
            const key = Object.keys(e.keyValue)[0];
            const value = e.keyValue[key];
            throw new DuplicateKeyError(key, value);
        } else {
            throw new ServiceError(`Unknown Error: ${e.message}`);
        }
    }
}


module.exports = {
    getAll,
    getHero,
    add
};
