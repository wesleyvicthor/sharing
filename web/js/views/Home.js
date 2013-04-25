define(['backbone', 'views/RegisterGroup', 'jquery-ui'], function (Backbone, RegisterGroupView) {
    return Backbone.View.extend({
        template: $('script#homepage').html(),
        events: {
            'click .menu-bar ul li': 'handleMenu',
            'click a[href=#register-group]': 'displayRegisterGroup'

        },
        
        initialize: function () {
            this.render();
        },

        handleMenu: function () {
            var tabIndex = this.$('#stage-container').tabs('option', 'active');
            this.$('ul.menu-bar li').removeClass('active');
            $(this.$('ul.menu-bar li').get(tabIndex)).addClass('active');
        },

        displayRegisterGroup: function () {
            new RegisterGroupView();
        },

        render: function () {
            $('.main-container').empty();

            var $homepage = this.$el.html(_.template(this.template));
            $('.main-container').html($homepage.fadeIn('slow'));
            $('.main-container').prepend('<div class="alert-wrapper"></div>');
            this.$('#stage-container').tabs();
        }
    });
});