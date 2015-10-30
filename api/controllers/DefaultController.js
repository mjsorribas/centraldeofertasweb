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
    },
    login: function (req, res) {
        var user = 'admin';
        var paswd = 'admin';

        console.log('here', req.body);
        if (user == req.body.username && paswd == req.body.password) {
            req.session.authenticated = true;
            return res.redirect('/');
        } else {
            return res.json({
                error: true,
                msg: 'User or password incorrect'
            })
        }
    }
};
