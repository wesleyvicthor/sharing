define(['backbone', 'underscore'], function (Backbone, _) {
    return Backbone.View.extend({
        className: 'group-box',

        initialize: function (collection) {
            this.collection = collection;
            this.render();
        },

        render: function () {
            var listItems = '';
            _.each(this.collection, function (user) {
                listItems += '<li><div class="user-photo">'+user.get('photo')+'</div><div class="user-name">'+user.get('name')+'</div></li>';
            });

            var list = '<ul>'+listItems+'</ul>';
            this.$el.html(list);
            return this;
        }
    });
});