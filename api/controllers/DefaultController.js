/**
 * DefaultController
 *
 * @description :: Server-side logic for managing default requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    sayHello: function (req, res) {
        return res.view('home/index');
    }
};
