/**
 * ProductsController
 *
 * @description :: Server-side logic for managing admin products CRUD
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs.extra');
var DIR_STRUCTURE = 'images/products/';

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
        req.file('image').upload({
            dirname: '../public/' + DIR_STRUCTURE
        }, function (err, files) {
            console.log(files);
            if (err)
                return res.json({
                    error: true,
                    message: err
                });
            
            if (files.length === 0) {
                return res.json({
                    error: true,
                    message: 'No file was uploaded'
                });
            }
            //Copy the file to the store folder
            fs.copyRecursive(files[0].fd, sails.config.uploadPath + DIR_STRUCTURE, function (err) {
                if (err) {
                    return res.json({
                        error: true,
                        message: err
                    });
                }
            });
            return res.json({
                error: false,
                fileName: (files[0].fd).split('/').slice(-1), //fileName + '.' + fileType,
                message: files.length + ' file(s) were uploaded'
            });
        });
    }
};
