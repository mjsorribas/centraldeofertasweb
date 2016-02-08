/**
 * SalesController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    info: function (req, res) {
        Sale.findOne(req.param('id')).populateAll().exec(function (er, resp) {
            if (er)
                return res.json({
                    error: true,
                    msg: er
                });
            
            return res.json({
                error: false,
                item: resp
            });
        });
    }

};

