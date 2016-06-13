
module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")(mongoose);
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById" : findWidgetById,
        "reorderWidget" : reorderWidget,
        "createWidget" : createWidget,
        "updateWidget" : updateWidget,
        "deleteWidget" : deleteWidget
    };

    return api;


    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId}).sort({order: 1});
    }

    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId})
    }


    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.dateCreated = new Date();
        return Widget
            .count({_page: pageId})
            .then(
                function(count) {
                    widget.order = count;
                    return Widget.create(widget);
            }
        );

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
                    order: widget.order
                }
            }
        )
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId})
    }

    function reorderWidget(widgets, start_string, end_string) {
        var start = Number(start_string);
        var end = Number(end_string);
        var i;
        for (i in widgets) {
            var order = widgets[i].order;
            if (order == start) {
                widgets[i].order = end;
            } else if (start < end) {
                if (order <= end && order > start) {
                    widgets[i].order -= 1;
                }
            } else {
                if (order < start && order >= end) {
                    widgets[i].order += 1;
                }
            }
        }

        for(x in widgets) {
            var widgOrder = widgets[x].order;
            Widget.update({_id: widgets[x]._id}, {$set:{order: widgOrder}}, {multi: true})
                .then(
                    function(response) {
                        console.log(response)
                    },
                    function(error) {
                        console.log(response)
                    }
                )
        }


    }

};