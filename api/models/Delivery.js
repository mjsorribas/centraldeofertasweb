/**
 * Delivery.js
 *
 * @description :: This entity will be created the day before de delivery of each purchase (sale->deliverDate)
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        delivered: {
            type: 'boolean',
            required: true
        },
        purchase: {
            model: 'purchase'
        },
        distributor: {
            model: 'distributor'
        }
    }
};

