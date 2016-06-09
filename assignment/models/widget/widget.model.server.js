
module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")(mongoose);
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById" : findWidgetById,
        "createWidget" : createWidget,
        "updateWidget" : updateWidget,
        "deleteWidget" : deleteWidget
    };

    return api;


    function findAllWidgetsForPage(pageId) {
        return Widget.find({_user: pageId})
    }

    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId})
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.dateCreated = new Date();
        return Widget.create(widget);
    }

    function updateWidget(widgetId, widget) {
        return Widget.update(
            {_id: widgetId},
            {
                $set: {
                    name: widget.name,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    description: widget.description,
                    url: widget.url,
                    // might be a problem
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted,
                }
            }
        )
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId})
    }

    function reorderWidget(pageId, start, end) {
        //return Widget.remove({_id: widgetId})
    }

};