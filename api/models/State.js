/**
* State.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name: {
          type: 'string',
          required: 'true'
      },
      country: {
          model: 'country',
          required: true
      },
      cities: {
          collection: 'city',
          via: 'state'
      }
      
  }
};

