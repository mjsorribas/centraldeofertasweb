/**
 * DiscountType.js
 *
 * @description :: Model for handling sales types: discounts, discounts per items, etc
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        amount: {
            type: 'integer',
            required: true
        }
        /*sales: {
            collection: 'sale',
            via: 'discount_type'
        }*/
    }
};
