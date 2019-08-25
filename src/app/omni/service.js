'use strict';

const OmniModel = require('./crawler');

const getRoomsByDate = function getRoomsByDate(query, callback) {

    query = {
        CheckIn: query.CheckIn.replace(/\//g, ''),
        CheckOut: query.CheckOut.replace(/\//g, '')
    };

    OmniModel.getRoomsByDate(query, callback);
};

module.exports = {
    getRoomsByDate
};
