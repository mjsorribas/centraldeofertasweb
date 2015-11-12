/**
 * DefaultController
 *
 * @description :: Server-side logic for managing default requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        Sale.find().populateAll().exec(function (err, data) {
            if (err)
                return res.view('home/index', {
                    sales: null,
                    error: true
                });
            return res.view('home/index', {
                sales: data,
                error: false
            });
        });
    }
};
