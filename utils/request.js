const axios = require('axios');

async function fetchData(url) {
    let response;

    try {
        response = await axios.get(url);
    } catch (e) {
        throw e;
    }

    return response?.data ? response?.data : null
}

async function insertData(url, data) {
    let response;

    try {
        response = await axios.post(url, data);
    } catch (e) {
        throw e;
    }

    return response?.data ? response?.data : null
}

module.exports = {
    fetchData,
    insertData
}
