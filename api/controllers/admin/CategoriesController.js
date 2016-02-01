/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing admin categories CRUD
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var UPLOAD_PATH = '../../assets/images/category_icons/';

function fileExtension(fileName) {
    return fileName.split('.').slice(-1);
}

function safeFilename(name) {
    name = name.replace(/ /g, '-');
    name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
    name = name.replace(/\.+/g, '.');
    name = name.replace(/-+/g, '-');
    name = name.replace(/_+/g, '_');
    return name;
}

module.exports = {
    index: function (req, res) {
        res.view();
    },
    upload: function (req, res) {
        req.file('icon').upload({
            dirname: UPLOAD_PATH,
        }, function (err, files) {
            if (err) return res.json({
                error: true,
                message: err
            });

            return res.json({
                error: false,
                fileName: (files[0].fd).split('/').slice(-1),//fileName + '.' + fileType,
                message: files.length + ' file(s) were uploaded'
            });
        });
    }
};