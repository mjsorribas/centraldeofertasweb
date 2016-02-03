/**
 * Comments.js
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
        text: {
            type: 'string',
            required: true
        },
        parentId: {
            type: 'integer',
            required: true
        },
        discr: {
            type: 'string',
            enum: ['sale','product','distributor','brand','manufacturer','tips'],
            required: true
        },
        likes: 'integer',
        dislikes: 'integer'
    }
};

