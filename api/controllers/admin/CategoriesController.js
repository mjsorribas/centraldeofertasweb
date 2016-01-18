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
        var fileName = req.param('name').toLowerCase().replace(' ', '_');
        var fileType = fileExtension(req.file('icon')._files[0].stream.filename);
        console.log(fileName + '.' + fileType);
        var isFile = false;
        var index;
        
        try {
            console.log('ising file', UPLOAD_PATH + fileName + '.' + fileType);
            isFile = fs.statSync(UPLOAD_PATH + fileName + '.' + fileType).isFile();
            console.log('is file: ', isFile);
            index = 0;
            while (isFile) {
                try {
                    isFile = fs.statSync(UPLOAD_PATH + fileName + '_' + index + fileType).isFile();
                } catch (er) {
                    isFile = false;
                    break;
                }
                index++;
            }
        } catch (er) {
            console.warn(fileName + '.' + fileType + ' not found');
        }

        console.log(fileName, index, fileType);
        req.file('icon').upload({
            dirname: UPLOAD_PATH,
            saveAs: index >= 0 ? fileName + '_' + index + '.' + fileType : fileName + '.' + fileType
        }, function (err, files) {
            console.log(files);
            if (err) return res.json({
                error: true,
                message: err
            });

            return res.json({
                error: false,
                fileName: fileName + '.' + fileType,
                message: files.length + ' file(s) were uploaded'
            });
        })
    }
};