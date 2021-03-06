/**
 * Categories.js
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
        description: {
            type: 'string',
            defaultsTo: 'Sin descripcion'
        },
        icon: {
            type: 'string'
        },
        /**
         * @manyToOne: Product
         * @type Product
         */
        products: {
            collection: 'product',
            via: 'category'
        }
    }
};
