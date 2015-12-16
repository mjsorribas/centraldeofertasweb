/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing admin categories CRUD
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.view();
    },
    upload: function (req, res) {
        req.file('icon').upload({
            dirname: './assets/images/category_icons'
        }, function (err, files) {
            console.log(files);
            if (err) return res.json({error: true,message: err});
            
            return res.json({
                error: false,
                message: files.length + 'file(s) were uploaded'
            });
        })
    }
};
