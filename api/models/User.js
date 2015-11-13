// api/models/User.js

var _ = require('lodash');
//var crypto = require('crypto');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {
    // Extend with custom logic here by adding additional fields, methods, etc.
    atributes: {
        getGravatarUrl: function () {
            var md5 = crypto.createHash('md5');
            md5.update(this.email || '');
            return 'https://gravatar.com/avatar/'+ md5.digest('hex') + '?d=retro';
        }
    }/*,
    beforeCreate: function (user, next) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb(null, user);
                }
            });
        });
    }*/

});
