/* global Backform, Backbone, Backgrid, io */

/**
 * This should be the only thing you need to change in order to make it work with different models
 * 
 * @type Object
 */
var PageSettings = {
    /**
     * Name of model (singular)
     * @type String
     */
    model: 'category',
    controller: 'categories',
    /**
     * Identifier by wich the search input will search in the grid
     * @type Array
     */
    searchFields: ['name', 'description'],
    /**
     * This are the columns to be displayed in the grid, they will probably be the same as the Model's Attributes
     * @type Array
     */
    gridColumns: [
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
                render: function () {
                    this.$el.html('<img width="24" src="../images/category_icons/' + this.model.attributes.icon + '"/>');
                    return this;
                },
                onClick: function () {
                    console.log(this);
                }
            })
        }
    ],
    formFields: [
        {name: 'name', label: 'Nombre', control: 'input', placeholder: 'Carnes', required: true},
        {name: 'description', label: 'Descripcion', control: 'input', required: true},
        {name: 'icon', label: 'Icono', control: 'input', type: 'file', required: true},
        {control: 'button', label: 'Crear', extraClasses: ['btn-info', 'pull-right']}
    ]
};

(function () {
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

                    io.socket.get("/" + this.sailsCollection, where, _.bind(function (model) {
                        this.set(model);
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

    var Model = Backbone.Model.extend({
        urlRoot: '/' + PageSettings.model,
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
            var value = model.changed[options.attributes.name];
            if (value == '' || value == null || value == false)
                return false;
            if (command.which == 27 || command.which == 0)
                return false;
            /** TODO: check actual change in model **/
            this.saveModel();
        },
        saveModel: function () {
            this.save(null, {
                silent: true,
                wait: true,
                success: function (model, res) {
//                    console.log('Success: ', model, res);
                    triggerAlert('success', 'Categoria modificada');
                },
                error: function (model, res) {
                    console.error('Error: ', model, res);
                    triggerAlert('error', 'Error: Atributos invalidos');
                    model.fetch();
                }
            });
        }
    });

    var PageableCollection = SailsCollection.extend({
        url: "/" + PageSettings.model,
        mode: "client",
        model: Model,
        sailsCollection: PageSettings.model,
        state: {
            pageSize: 5
        }
    });

    var pageableCollection = new PageableCollection();

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
        columns: PageSettings.gridColumns,
        collection: pageableCollection,
        className: 'table table-striped table-hover'
    });

    var paginator = new Backgrid.Extension.Paginator({
        collection: pageableCollection,
        className: 'pagination-holder'
    });

    var clientSideFilter = new Backgrid.Extension.ClientSideFilter({
        collection: pageableCollection,
        className: 'hidden',
        placeholder: "id, name, description",
        // The model fields to search for matches
        fields: ['name', 'description'],
        // How long to wait after typing has stopped before searching can start
        wait: 150
    });

// set search and filter input box
    $("#grid").prepend(clientSideFilter.render().el);
    $('#model_table_search').keyup(function () {
        var value = this.value;
        var input = $(clientSideFilter.el).children()[1];
        input.value = value;
        clientSideFilter.search();
    });

// add table and pagination buttons to html
    $("#grid").append(grid.render().$el);
    $("#paginator").append(paginator.render().$el);

// get models list from server
    pageableCollection.fetch();

    function cleanForm(form) {
        var inputs = $(form).find('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    var newModel = new Model();
    var form = new Backform.Form({
        el: '#create_form',
        model: newModel,
        fields: PageSettings.formFields,
        events: {
            'submit': function (e) {
                var self = this;
                e.preventDefault();
                var formData = new FormData($('#create_form')[0]);
                $.ajax({
                    url: '/admin/' + PageSettings.controller + '/upload',
                    type: 'POST',
                    data: formData,
                    beforeSend: function (data) {
                    },
                    success: function (res) {
                        if (res.error) {
                            console.error(res.message);
                        } else {
                            self.model.set('icon', res.fileName);
                            self.model.save().done(function (result) {
                                newModel = new Model();
                                self.model = newModel;
                                self.render();
                            });
                        }
                    },
                    error: function () {
                        console.error();
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
                return false;
            }
        }
    }).render();
})();