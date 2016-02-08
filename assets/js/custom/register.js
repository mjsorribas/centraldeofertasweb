/* global Backform */

(function () {
    _.extend(Backform, {
        controlLabelClassName: "control-label",
        controlsClassName: "",
        groupClassName: 'form-group has-feedback'
    });
    var InputNoLabel = Backform.InputControl.extend({
        defaults: {
            type: "text",
            label: "",
            maxlength: 255,
            extraClasses: [],
            helpMessage: '',
            icon: ''
        },
        template: _.template([
            '<div class="<%=Backform.controlsClassName%>">',
            '   <input type="<%=type%>" class="<%=Backform.controlClassName%> <%=extraClasses.join(\' \')%>" name="<%=name%>" maxlength="<%=maxlength%>" value="<%-value%>" placeholder="<%-placeholder%>" <%=disabled ? "disabled" : ""%> <%=required ? "required" : ""%> />',
            '   <span class="<%=icon%> form-control-feedback"></span>',
            '   <% if (helpMessage.length) { %>',
            '       <span class="<%=Backform.helpMessageClassName%>"><%=helpMessage%></span>',
            '   <% } %>',
            '</div>'
        ].join("\n"))
    });
    var formFields = [
        {
            name: 'username',
            control: InputNoLabel,
            placeholder: 'Nombre de Usuario',
            icon: 'fa fa-user'
        },
        {
            name: 'email',
            placeholder: 'Mail',
            control: InputNoLabel,
            type: 'email',
            required: true,
            icon: 'fa fa-envelope'
        },
        {
            name: 'password',
            placeholder: 'Contraseña',
            control: InputNoLabel,
            type: 'password',
            required: true,
            icon: 'fa fa-key'
        },
        {
            placeholder: 'Repetir Contraseña',
            control: InputNoLabel,
            type: 'password',
            icon: 'fa fa-key'
        },
        {
            name: 'firstName',
            placeholder: 'Nombre',
            control: InputNoLabel,
            required: true,
            icon: 'fa fa-at'
        },
        {
            name: 'lastName',
            placeholder: 'Apellido',
            control: InputNoLabel,
            required: true,
            icon: 'fa fa-at'
        },
        {
            name: 'workType',
            placeholder: 'Rubro',
            control: InputNoLabel,
            required: true,
            icon: 'fa fa-building'
        },
        {
            name: 'phone',
            placeholder: 'Telefono',
            control: InputNoLabel,
            type: 'tel',
            required: true,
            pattern: '([\-\. ]?[0-9]){10}',
            icon: 'fa fa-phone'
        },
        {
            name: 'cuit',
            placeholder: 'CUIT',
            control: InputNoLabel,
            required: true,
            icon: 'fa fa-book'
        },
        {
            name: 'businessName',
            placeholder: 'Razon Social',
            control: InputNoLabel,
            required: true,
            icon: 'fa fa-building-o'
        },
        {
            control: 'button',
            label: 'Registrarse',
            extraClasses: ['btn', 'btn-primary', 'btn-block', 'btn-flat']
        }
    ];
    var newModel = new Backbone.Model();
    var form = new Backform.Form({
        el: '#register_form',
        model: newModel,
        fields: formFields,
        events: {
            'submit': function (e) {
                e.preventDefault();
                console.log(this.model);
                return false;
                this.model.save().done(function (result) {
                    console.log(result);
                });
                return false;
            }
        }
    }).render();
})();