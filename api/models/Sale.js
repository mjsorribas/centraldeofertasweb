/**
 * Sale.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        title: {
            type: 'string',
            required: true
        },
        description: 'string',
        usage: 'string',
        discount_type: {
            model: 'discounttype',
            required: true
        },
        value: {
            type: 'float',
            required: true
        },
        image: 'string',
        date_from: {
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        date_to: {
            type: 'datetime',
            defaultsTo: function () {
                var currentDate = new Date();
                var newDate = currentDate.setFullYear(currentDate.getFullYear() + 10);
                return new Date(newDate);
            }
        }
    }
};
