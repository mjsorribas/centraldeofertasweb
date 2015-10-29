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
        type: {
            model: 'type'
        },
        category: {
            model: 'category'
        },
        brand: {
            model: 'brand'
        },
        chain: {
            model: 'chain'
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
            type: 'float',
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
                return new Date().setFullYear(+10);
            }
        }
    }
};
