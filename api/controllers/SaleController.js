/**
 * SalesController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    info: function (req, res) {
        var sale;
        Sale.findOne(1).populate('products').exec(function (er, resp) {
            return res.json({
                item: resp
            });
        });
    }

};

