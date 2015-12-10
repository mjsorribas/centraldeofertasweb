/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        description: 'string',
        image: 'string',
        value: {
            type: 'float',
            required: true
        },
        brand: {
            model: 'brand',
            required: true
        },
        category: {
            model: 'category',
            required: true
        },
        manufacturer: {
            model: 'manufacturer',
            required: true
        },
        /**
         * @Many-to-many: Product
         */
        sales: {
            collection: 'sale',
            via: 'products'
        }
    }
};

