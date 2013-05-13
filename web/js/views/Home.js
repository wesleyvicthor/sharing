define([
    'backbone',
    'views/RegisterGroup',
    'views/Files',
    'views/Groups',
    'collections/Group',
    'views/User',
    'jquery-ui'
], function (Backbone, RegisterGroupView, FilesView, GroupsView, GroupCollection, UserView) {
    return Backbone.View.extend({
        template: $('script#homepage').html(),
        events: {
            'click .menu-bar ul li': 'handleMenu',
            'click a[href=#register-group]': 'displayRegisterGroup',
            'click a[href=#files]': 'displayFiles',
            'click a[href=#groups]': 'displayGroups'
        },

        initialize: function () {
            this.render();
            new UserView({model: Sharing.User});
        },

        handleMenu: function () {
            var tabIndex = this.$('#stage-container').tabs('option', 'active');
            this.$('ul.menu-bar li').removeClass('active');
            $(this.$('ul.menu-bar li').get(tabIndex)).addClass('active');
        },

        displayGroups: function () {
            $('#groups').empty();
            new GroupsView(new GroupCollection());
        },
 
        displayFiles: function () {
            new FilesView();
        },

        displayRegisterGroup: function () {
            if (!Sharing.User.isTeacher()) {
                return;
            }
            new RegisterGroupView();
        },

        render: function () {
            $('.main-container').empty();

            var $homepage = this.$el.html(_.template(this.template, { username: Sharing.User.username }));
            if (!Sharing.User.isTeacher()) {
                this.$('a[href=#register-group]').parent('li').remove();
            }

            $('.main-container').html($homepage.fadeIn('slow'));
            $('.main-container').prepend('<div class="alert-wrapper"></div>');
            this.$('#stage-container').tabs();
        }
    });
});