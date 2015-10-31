/**
 * setLayout
 *
 * @module      :: Policy
 * @description :: Simple policy that sets the site layout depending on route
 *
 */
module.exports = function (req, res, next) {
    var path = (req.route.path);
    if (path.indexOf('/admin') != -1) {
        res.locals.layout = 'adminlayout';
    }
    return next();
};
