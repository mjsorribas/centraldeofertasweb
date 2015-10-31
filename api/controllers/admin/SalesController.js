/**
 * SalesController
 *
 * @description :: Server-side logic for managing admin sales SUD
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        Sale.find().populateAll().exec(function (err, data) {
            if (err)
                return res.view({
                    sales: null,
                    error: true
                });
            return res.view({
                sales: data,
                error: false
            });
        });
    },
    new: function (req, res) {
        DiscountType.find().exec(function (err, data) {
            if (err)
                return res.view({
                    error: true,
                    msg: 'Paso algo malo'
                });
            return res.view({
                error: false,
                discounts: data
            })
        });
    }
};
