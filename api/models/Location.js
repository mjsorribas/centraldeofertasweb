/**
* Location.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        lat: {
            type: 'string',
            required: true
        },
        long: {
            type: 'string',
            required: true
        },
        address: 'string',
        streetNumber: 'string',
        streetName: 'string',
        zipcode: 'string',
        /**
         * @ORM({association: 'manyToOne', model: 'City'})
         * @type City
         */
        city: {
            model: 'city'
        },
        /**
         * @ORM({association: 'manyToOne', model: 'State'})
         * @type State
         */
        state: {
            model: 'state'
        },
        /**
         * @ORM({association: 'manyToOne', model: 'Country'})
         * @type Country
         */
        country: {
            model: 'country'
        },
        /**
         * @ORM({association: 'manyToMany', model: 'Sale'})
         * @type Sale
         */
        sales: {
            collection: 'sale',
            via: 'location'
        },
        /**
         * @ORM({association: 'manyToMany', model: 'Distributor'})
         * @type Distributor
         */
        distributors: {
            collection: 'distributor',
            via: 'deliveryZones'
        },
        user: {
            model: 'user'
        }
    }
};

