define(['backbone', 'views/File'], function (Backbone, FileView) {
    return Backbone.View.extend({
        template: $('script#files').html(),

        initialize: function (collection) {
            this.collection = collection;
            $('.section-name').html('Arquivos');
            this.collection.on('reset', this.render, this);
        },

        render: function () {
            $('#files table tbody').remove();
            var $tbody = $('<tbody/>');
            _.each(this.collection.models, function (fileModel) {
                $tbody.append(
                    (new FileView(fileModel)).render()
                );
            });
            $('#files table').append($tbody);
        }
    });
});