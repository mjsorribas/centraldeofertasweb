/**
 * Ranking.js
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
        sale: {
            model: 'sale',
            required: true
        },
        value: {
            type: 'integer',
            enum: [1,2,3,4,5],
            required: true
        }
    }
};

