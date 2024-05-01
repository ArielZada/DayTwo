const {statuses} = require("../config");

class ServiceError extends Error {
    constructor(message) {
        super(message);
    }
}

class DuplicateKeyError extends ServiceError {
    constructor(key, value) {
        const message = `Duplicate Key Error for Key ${key}, value ${value} already exists`;
        super(message);
    }
    static errorCode = 11000;
}

class BadIDError extends ServiceError {
    constructor(value) {
        const message = `ID provided ${value} does not exist, please make sure you provide an existing ID`;
        super(message);
    }
}

class BadInputError extends ServiceError {
    constructor(message) {
        super(message);
    }
}

class BadMessageToBase extends ServiceError {
    constructor(message) {
        super(message);
    }
    static errorCodes = ['ERR_BAD_REQUEST','ECONNREFUSED'];
}

function getStatus(e) {
    if (e instanceof BadIDError) {
        return statuses.CLIENT_ERROR.STATUS_CODE_BAD_REQUEST;
    } else if (e instanceof DuplicateKeyError) {
        return statuses.CLIENT_ERROR.STATUS_CODE_BAD_REQUEST;
    } else if (e instanceof BadInputError) {
        return statuses.CLIENT_ERROR.STATUS_CODE_BAD_REQUEST;
    } else {
        return statuses.SERVER_ERROR.STATUS_CODE_INTERNAL_SERVER_ERROR;
    }
}

module.exports = {
    ServiceError,
    DuplicateKeyError,
    BadIDError,
    BadInputError,
    BadMessageToBase,
    getStatus
};
