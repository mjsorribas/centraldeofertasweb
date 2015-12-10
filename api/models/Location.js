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
        //@Many-to-One: City
        city: {
            model: 'city'
        },
        //@Many-to-One: State
        state: {
            model: 'state'
        },
        //@Many-to-One: Country
        country: {
            model: 'country'
        },
        /**
         * @Many-to-Many - Sale  
         */
        sales: {
            collection: 'sale',
            via: 'location'
        }
    }
};

