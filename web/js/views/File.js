define(['backbone'], function (Backbone) {
    return Backbone.View.extend({
        initialize: function (model) {
            this.model = model;
        },

        render: function () {
            var $row = $('<tr/>').addClass('file-row');
            $row.append(
                $('<td/>').addClass('file-icon ' + this.model.get('fileicon'))
            ).append(
                $('<td/>').addClass('highlight').text(this.model.get('filename'))
            ).append(
                $('<td/>').text(this.model.get('filetype'))
            ).append(
                $('<td/>').addClass('last-column').text(this.model.get('datetime'))
            );
            return $row;
        }
    });
});