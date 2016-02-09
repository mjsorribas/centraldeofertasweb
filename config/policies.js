/*
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */

module.exports.policies = {
    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions (`true` allows public     *
     * access)                                                                  *
     *                                                                          *
     ***************************************************************************/

    '*': [
        'basicAuth',
        'passport',
        'sessionAuth',
        'ModelPolicy',
        'AuditPolicy',
        'OwnerPolicy',
        'PermissionPolicy',
        'RolePolicy',
        'CriteriaPolicy',
    ],
    UserController: {
        '*': [
            'basicAuth',
            'passport',
            'sessionAuth',
            'ModelPolicy',
            'AuditPolicy',
            'OwnerPolicy',
            'PermissionPolicy',
            'RolePolicy',
            'CriteriaPolicy',
        ],
        create: true
    },
    AuthController: {
        '*': ['passport']
    },
    AdminController: {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/SalesController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/CategoriesController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/BrandsController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/ManufacturersController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/ProductsController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/WorktypesController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    'admin/UsersController': {
        '*': ['setLayout', 'basicAuth', 'passport', 'sessionAuth']
    },
    LocationController: {
        '*': true
    }

    /***************************************************************************
     *                                                                          *
     * Here's an example of mapping some policies to run before a controller    *
     * and its actions                                                          *
     *                                                                          *
     ***************************************************************************/
    // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture	: 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
    // }
};
