/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    /**
     * Method for getting all information about one product
     * 
     * 
     * @param Object req
     * @param Object res
     * @returns JSONObject
     */
    info: function (req, res) {
        Product.findOne(req.param('id')).populateAll().exec(function (er, resp) {
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

