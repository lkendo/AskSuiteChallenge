'use strict';

const Omni = require('./controller.js');

module.exports = {
    '/api/search': {
        get: [Omni.getSearch]
    }
};
