var SailsCollection = Backbone.PageableCollection.extend({
    sailsCollection: "",
    socket: null,
    sync: function (method, model, options) {
        var where = {};
        if (options.where) {
            where = {
                where: options.where
            };
        }
        if (typeof this.sailsCollection === "string" && this.sailsCollection !== "") {
            this.socket = io.connect();
            this.socket.on("connect", _.bind(function () {

                io.socket.get("/" + this.sailsCollection, where, _.bind(function (categories) {
                    this.set(categories);
                }, this));

                io.socket.on(this.sailsCollection, _.bind(function (msg) {
                    var m = msg.verb;
                    if (m === "created") {
                        this.add(msg.data);
                    } else if (m === "updated") {
                        this.get(msg.id).set(msg.data);
                    } else if (m === "destroyed") {
                        this.remove(this.get(msg.id));
                    }
                }, this));
            }, this));
        } else {
            console.warn("Error: Cannot retrieve models because property 'sailsCollection' not set on the collection");
        }
    }
});

var SaleModel = Backbone.Model.extend({
    urlRoot: '/sale',
    initialize: function () {
        Backbone.Model.prototype.initialize.apply(this, arguments);
        //this.bind("change", this.saveModel, this);
        //this.bind('backgrid:edit', this.edit, this);
        //this.bind('backgrid:editing', this.editing, this);
        this.bind('backgrid:edited', this.edited, this);
    },
    edit: function () {
        //console.log('Edit', this);
    },
    editing: function () {
        //console.log('Editing', this);
    },
    edited: function (model, options, command) {
        if (command.which == 27 || command.which == 0) return false;
        /** TODO: check actual change in model **/
        this.saveModel();
    },
    saveModel: function () {
        this.save(null, {
            silent: true,
            wait: true,
            success: function (model, res) {
                console.log('Success: ', model, res);
            },
            error: function (model, res) {
                console.error('Error: ', model, res);
            }
        });
    }
});


/** **/
var columns = [
    {
        // enable the select-all extension
        name: "",
        cell: "select-row",
        headerCell: "select-all"
    },
    {
        name: "id",
        label: "Id",
        editable: false,
        cell: Backgrid.IntegerCell.extend({
            orderSeparator: ''
        })
    },
    {
        name: 'title',
        label: 'Titulo',
        cell: 'string'
    },
    {
        name: 'description',
        label: 'Descripcion',
        cell: 'string'
    },
    {
        name: 'usage',
        label: 'Uso',
        cell: 'string'
    },
    {
        name: 'description',
        label: 'Descripcion',
        cell: 'string'
    }
    /*image: {
            type: 'string',
            defaultsTo: null
        },
        value: {
            type: 'float',
            required: true
        },
        unitsNeeded: {
            type: 'integer',
            required: true
        },
        buyersNeeded: {
            type: 'integer',
            required: true
        },
        purchases: {
            collection: 'purchase',
            via: 'sale'
        },
        products: {
            collection: 'product',
            via: 'sales'
        },
        dateFrom: {
            type: 'datetime',
            defaultsTo: function () {
                return new Date();
            }
        },
        dateTo: {
            type: 'datetime',
            defaultsTo: function () {
                var currentDate = new Date();
                var newDate = currentDate.setFullYear(currentDate.getFullYear() + 10);
                return new Date(newDate);
            }
        },
        deliveryDate: {
            type: 'datetime',
            required: true
        },
        rankings: {
            collection: 'ranking',
            via: 'sale'
        },
        location: {
            collection: 'location',
            via: 'sales'
        },*/
];
var CategoryPageable = SailsCollection.extend({
    url: "/category",
    mode: "client",
    model: SaleModel,
    sailsCollection: 'category',
    state: {
        pageSize: 5
    }
});

var categories = new CategoryPageable();

Backgrid.Grid.prototype.deleteModels = function () {
    var models = this.getSelectedModels();
    if (models.length <= 0) {
        alert('No models where selected');
        return false;
    } else {
        var r = confirm('Seguro que desea eliminar los elementos seleccionados?');
        if (r) {
            for (var i = 0; i < models.length; i++) {
                models[i].destroy();
            }
        } else {
            return false;
        }
    }
};

var grid = new Backgrid.Grid({
    columns: columns,
    collection: categories,
    className: 'table table-striped table-hover'
});

var paginator = new Backgrid.Extension.Paginator({
    collection: categories,
    className: 'pagination-holder'
});

var clientSideFilter = new Backgrid.Extension.ClientSideFilter({
    collection: categories,
    className: 'hidden',
    placeholder: "id, name, description",
    // The model fields to search for matches
    fields: ['name', 'description'],
    // How long to wait after typing has stopped before searching can start
    wait: 150
});

// set search and filter input box
$("#grid").prepend(clientSideFilter.render().el);
$('#categories_table_search').keyup(function () {
    var value = this.value;
    var input = $(clientSideFilter.el).children()[1];
    input.value = value;
    clientSideFilter.search();
});

// add table and pagination buttons to html
$("#grid").append(grid.render().$el);
$("#paginator").append(paginator.render().$el);

// get categories list from server
categories.fetch();

// handle create form submit
$('form.create-form').submit(function () {
    var formData = new FormData($(this)[0]);
    console.log($(this));
    //return false;
    var $formData = $(this).serializeArray();
    var modelData = {};
    for (var i = 0; i < $formData.length; i ++) {
        modelData[$formData[i].name] = $formData[i].value;
    }
    $.ajax({
        url: '/admin/categories/upload',
        type: 'POST',
        data: formData,
        beforeSend: function () {
            console.log('mandando');
        },
        success: function (res) {
            if (res.error) {
                console.error(res.message);
            } else {
                console.log(res);
                modelData.icon = res.fileName;
                categories.create(modelData, {
                    wait: true
                });
            }
        },
        error: function () {
            console.error()
        },
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
});

function cleanForm (form) {
    var inputs = $(form).find('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}