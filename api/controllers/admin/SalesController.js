/**
 * SalesController
 *
 * @description :: Server-side logic for managing admin sales SUD
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        Sale.find().populateAll().exec(function (err, data) {
            if (err)
                return res.view({
                    sales: null,
                    error: true
                });
            return res.view({
                sales: data,
                error: false
            });
        });
    },
    create: function (req, res) {
        attrs = {
            discounts: [],
            categories: [],
            brands: [],
            chains: [],
            manufacturers: []
        };
        DiscountType.find().exec(function (err, data) {
            if (err)
                return res.view({
                    error: true,
                    msg: 'Error cargando descuentos'
                });
            attrs.discounts = data;
            Category.find().exec(function (err, data) {
                if (err)
                    return res.view({
                        error: true,
                        msg: 'Error cargando categorias'
                    });
                attrs.categories = data;
                Brand.find().exec(function (err, data) {
                    if (err)
                        return res.view({
                            error: true,
                            msg: 'Error cargando marcas'
                        });
                    attrs.brands = data;
                    Chain.find().exec(function (err, data) {
                        if (err)
                            return res.view({
                                error: true,
                                msg: 'Error cargando cadenas'
                            });
                        attrs.chains = data;
                        Manufacturer.find().exec(function (err, data) {
                            if (err)
                                return res.view({
                                    error: true,
                                    msg: 'Error cargando fabricantes'
                                });
                            attrs.manufacturers = data;
                            return res.view({
                                error: false,
                                data: attrs
                            });
                        });
                    });
                });
            });
        });


    }
};
