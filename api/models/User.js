// api/models/User.js

var _ = require('lodash');
//var crypto = require('crypto');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {
    // Extend with custom logic here by adding additional fields, methods, etc.
    attributes: {
        firstName: {
            type: 'string',
//            required: true
        },
        lastName: {
            type: 'string',
//            required: true
        },
        workType: {
            model: 'worktype',
//            required: true
        },
        phone: {
            type: 'string',
//            required: true
        },
        cuit: {
            type: 'string',
//            required: true
        },
        businessName: {
            type: 'string',
//            required: true
        },
        /**
         * @ORM({association: 'oneToOne', model: 'Location'})
         * @type Location
         */
        location: {
            model: 'location'
        }
    }
});
