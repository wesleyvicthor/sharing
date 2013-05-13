define(['backbone', 'underscore'], function (Backbone, _) {
    return Backbone.View.extend({
        initialize: function (model) {
            this.model = model;
            this.render();
        },

        render: function () {
            var listItems = '';
            _.each(this.model.get('list'), function (user) {
                listItems += '<li><div class="user-photo">'+user.photo+'</div><div class="user-name">'+user.name+'</div></li>';
            });
            var list = '<ul>'+listItems+'</ul>';
            return '<div class="group-box">'+list+'<h2 class="group-name">'+this.model.get('name')+'</h2></div>';
        }
    });
});