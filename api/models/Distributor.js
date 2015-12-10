/**
 * Distributor.js
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
        /**
         * @ORM({association: 'oneWay', model: 'Location'})
         * @type Location
         */
        location: {
            model: 'location',
            required: 'true'
        },
        /**
         * @ORM({association: 'manyToMany', model: 'Location'})
         * @type Location
         */
        deliveryZones: {
            collection: 'location',
            via: 'distributors'
        }
    }
};

