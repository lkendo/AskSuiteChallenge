'use strict';

const moment = require('moment');

const validate = function validate(data = {}, callback) {
    const today = moment().startOf('day');
    const yesterday = today.subtract(1, 'day');
    const checkIn = moment(data.CheckIn, 'DD/MM/YYYY', true);
    const checkOut = moment(data.CheckOut, 'DD/MM/YYYY', true);
    if (!checkIn.isValid() || !checkOut.isValid()) {
        return messageReturn('CheckIn and CheckOut must be a valid Date DD/MM/YYYY' , callback);
    }
    if (!checkIn.isAfter(yesterday)) {
        return messageReturn('CheckIn Date must be today or after', callback);
    }
    if (!checkOut.isAfter(today)) {
        return messageReturn('Checkout Date must be after today', callback);
    }
    if (!checkOut.isAfter(checkIn)) {
        return messageReturn('Checkout Date must be after checkIn', callback);
    }
    return callback({ error: false });
};

const messageReturn = function messageReturn(message, callback) {
    return callback({
        error: {
            details: [message]
        }
    });
};

module.exports = {
    validate
};
