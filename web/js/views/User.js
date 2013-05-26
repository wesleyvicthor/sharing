define(['backbone'], function (Backbone) {
    return Backbone.View.extend({

        initialize: function (model) {
            this.model = model;
            this.render();
        },

        changePhoto: function (self) {
            return function (event) {
                console.log('alterar foto do usuário');
            }
        },

        changeName: function (self) {
            return function (event) {
                self.model.set('username', $(event.target).text());
            }
        },

        render: function () {
            var self = this;
            var $userPhoto = $('<div />').addClass('user-photo icon-user');
            $userPhoto.on('click', this.changePhoto(self));

            var $userName = $('<span />')
                .addClass('user-name')
                .attr({ contenteditable: true })
                .text(this.model.get('username'));

            $userName.on('blur', this.changeName(self));

            $('.user-info').append($userPhoto).append($userName);
        }
    });
});