/**
 * LocationController
 *
 * @description :: Server-side logic for location related tasks: geocode and reverse, etc
 */

module.exports = {
    
    address: function (req, res) {
        LocationService
                .geocode(req.param('address'))
                .then(res.ok)
                .catch(res.negotiate);
    },
    reverse: function (req, res) {
        LocationService
                .reverse(req.param('lat'), req.param('long'))
                .then(res.ok)
                .catch(res.negotiate);
    }
};