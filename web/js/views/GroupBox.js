define(['backbone', 'underscore'], function (Backbone, _) {
    return Backbone.View.extend({
        initialize: function (model) {
            this.model = model;
            this.render();
        },

        render: function () {
            var self = this;
            var listItems = '';
            _.each(this.model.get('list'), function (user) {
                listItems += '<li><div class="user-photo icon-user-small">'+user.photo+'</div><div class="user-name">'+user.name+'</div></li>';
            });
            var list = '<ul>'+listItems+'</ul>';
            var $groupBox = $('<div />');
            var $groupName = $('<h2 class="group-name">').attr({
                contenteditable: this.model.get('owner'),
                'data-groupid': this.model.get('id'),
                spellcheck: false
            }).text(this.model.get('name'));

            $groupName.on('blur', function () {
                self.model.set('name', $(this).text());
            });

            $groupBox.append($groupName.get(0));
            return $groupBox.prepend(list).wrap('<div>').addClass('group-box');
        }
    });
});