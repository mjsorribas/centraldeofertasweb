/**
 * Sales.js
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
        discount_type: {
            model: 'discounttype',
            required: true
        },
        category: {
            model: 'category',
            required: true
        },
        brand: {
            model: 'brand',
            required: true
        },
        chain: {
            model: 'chain',
            required: true
        },
        manufacturer: {
            model: 'manufacturer'
        },
        image: 'string',
        value: {
            type: 'float',
            required: true
        },
        value_final: {
            type: 'float'
        },
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
