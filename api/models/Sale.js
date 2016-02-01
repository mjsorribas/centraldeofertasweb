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
        image: {
            type: 'string',
            defaultsTo: null
        },
        value: {
            type: 'float',
            required: true
        },
        unitsNeeded: {
            type: 'integer',
            required: true
        },
        buyersNeeded: {
            type: 'integer',
            required: true
        },
        /**
         * @manyToMany: Product
         */
        products: {
            collection: 'product',
            via: 'sales'
        },
        dateFrom: {
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        dateTo: {
            type: 'datetime',
            defaultsTo: function () {
                var currentDate = new Date();
                var newDate = currentDate.setFullYear(currentDate.getFullYear() + 10);
                return new Date(newDate);
            }
        },
        deliveryDate: {
            type: 'datetime',
            required: true
        },
        /**
         * @manyToOne: Purchase
         * @type Purchase
         */
        purchases: {
            collection: 'purchase',
            via: 'sale'
        },
        /**
         * @manyToOne: Ranking
         * @type Ranking
         */
        rankings: {
            collection: 'ranking',
            via: 'sale'
        },
        /**
         * @manyToMany: Ranking
         * @type Location
         */
        location: {
            collection: 'location',
            via: 'sales'
        }
    }
};
