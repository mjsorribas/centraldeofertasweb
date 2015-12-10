/**
 * Reputation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        user: {
            model: 'user',
            required: true
        },
        distributor: {
            model: 'distributor',
            required: true
        },
        value: {
            type: 'integer',
            enum: [1,2,3],
            required: true
        }
    }
};

