module.exports.API = {
    PORT: 4000,
    MONGODB_URI: "mongodb+srv://arielzada:vS9aSSm6wQK4fg8Y@superheros.agbmr7n.mongodb.net/?retryWrites=true&w=majority&appName=superHeros",
    DB_FETCH_WAIT_IN_MINUTES: 3
}

module.exports.ENDPOINTS = {
    SUPERHEROS: 'superheroes',
    TIMERS: 'timers',
    BASE: 'base'
}
module.exports.statuses = {
    SUCCESS: {
        STATUS_CODE_OK: 200,
        STATUS_CODE_CREATED: 201,
        STATUS_CODE_ACCEPTED: 202
    },
    CLIENT_ERROR: {
        STATUS_CODE_BAD_REQUEST: 400,
        STATUS_CODE_UNAUTHORIZED: 401,
        STATUS_CODE_FORBIDDEN: 403,
        STATUS_CODE_NOT_FOUND: 404
    },
    SERVER_ERROR: {
        STATUS_CODE_INTERNAL_SERVER_ERROR: 500,
        STATUS_CODE_NOT_IMPLEMENTED: 501,
        STATUS_CODE_BAD_GATEWAY: 502,
        STATUS_CODE_SERVICE_UNAVAILABLE: 503,
        STATUS_CODE_GATEWAY_TIMEOUT: 504
    }
};