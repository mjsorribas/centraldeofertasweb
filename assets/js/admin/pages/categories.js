var SailsCollection = Backbone.Collection.extend({
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
            console.log("Error: Cannot retrieve models because property 'sailsCollection' not set on the collection");
        }
    }
});

var CategoryModel = Backbone.Model.extend({
    urlRoot: '/category'
});

var CategoryCollection = SailsCollection.extend({
    sailsCollection: 'category',
    model: CategoryModel
});

var categories = new CategoryCollection();
categories.fetch();

/*$("#postMessageButton").click(function() {
 var messageText = $("#message").val();
 messages.create({
 message: messageText
 }, {
 wait: true
 });
 $("#message").val("");
 });*/

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
var CategoriesView = Backbone.View.extend({
    el: '#categoriesCont',
    initialize: function () {
        this.collection.on('add', this.render, this);
        this.collection.on('change', this.render, this);
        this.collection.on('remove', this.render, this);
        this.render();
    },
    template: _.template(JST.getTemplate('categories-table')),
    render: function () {
        this.$el.html("");
        this.collection.each(function (msg) {
            this.$el.append(this.template(msg.toJSON()));
        }, this);
    }
});

var cView = new CategoriesView({
    collection: categories
});
