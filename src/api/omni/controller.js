'use strict';
const Omni = require('../../app/omni/service');
const Validator = require('./validation');

const getSearch = function getSearch(request, response) {
    const query = {
        CheckIn: request.query.CheckIn,
        CheckOut: request.query.CheckOut
    };

    Validator.validate(query, (validation) => {
        if (validation.error) {
            return response.json(400, { message: validation.error, code: 400 });
        }

        Omni.getRoomsByDate(query, (error, rooms) => {
            if (error) {
                return response.json(500, { message: error, code: 500 });
            }
            return response.json(rooms);
        });
    });

};

module.exports = {
    getSearch
};
