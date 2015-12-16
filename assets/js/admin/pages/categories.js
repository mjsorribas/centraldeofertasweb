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

var CategoryModel = Backbone.Model.extend({
    urlRoot: '/category',
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
        name: "id",
        label: "Id",
        editable: false,
        cell: Backgrid.IntegerCell.extend({
            orderSeparator: ''
        })
    },
    {
        name: "name",
        label: "Nombre",
        cell: "string",
    },
    {
        name: "description",
        label: "Descripción",
        cell: "string"
    },
    {
        name: 'icon',
        label: 'Icono',
        cell: Backgrid.Cell.extend({
            /*editor: Backbone.View.extend({
                events: {
                    'click': 'onClick'
                },
                onClick: function () {
                    console.log(this);
                }
            }),*/
            events: {
                'click': 'onClick'
            },
            render: function() {
                this.$el.html('<img src="' + this.model.attributes.icon + '"/>');
                return this;
            },
            onClick: function () {
                console.log(this)
            }
        })
    }
];
var CategoryPageable = SailsCollection.extend({
    url: "/category",
    mode: "client",
    model: CategoryModel,
    sailsCollection: 'category',
    state: {
        pageSize: 5
    }
});

var categories = new CategoryPageable();

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
    console.log(formData);
    //return false;
    var $formData = $(this).serializeArray();
    var modelData = {};
    for (var i = 0; i < $formData.length; i ++) {
        modelData[$formData[i].name] = $formData[i].value;
    }
    $.ajax({
        url: '/admin/categories/upload/',
        type: 'POST',
        data: formData,
        beforeSend: function () {
            console.log('mandando');
        },
        success: function (res) {
            if (res.error) {
                console.error(res.message);
            } else {
                console.log(res.message);
                /*categories.create(modelData, {
                    wait: true
                });*/
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