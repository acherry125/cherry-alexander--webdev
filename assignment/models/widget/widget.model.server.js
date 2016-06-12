
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
        return Widget.find({_page: pageId})
    }

    function findWidgetById(widgetId) {
        return Widget.findOne({_id: widgetId})
    }

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.dateCreated = new Date();
        findAllWidgetsForPage(pageId)
            .then(
                function(response) {
                    var count = response.length;
                    // set equal to count (zero indexing)
                    widget.order = count;
                    Widget.create(widget)
                        .then(
                            function(response) {
                                return response;
                            },
                            function(error) {
                                return error;
                            }
                        )
                },
                function(error) {
                    return error;
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
                    formatted: widget.formatted
                }
            }
        )
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId})
    }

    function reorderWidget(pageId, start, end) {
        findAllWidgetsForPage(pageId)
            .then(
                function(response) {
                    var widgets = response.data;
                    for (x in widgets) {
                        var order = widgets[x].order;
                        if (order === start) {
                            widgets[x].order = end;
                        } else if (start < end) {
                            if (order <= end && order > start) {
                                widgets[x].order -= 1;
                            }
                        } else {
                            if (order >= end && order < start) {
                                widgets[x].order += 1;
                            }
                        }
                        updateWidget(pageId, widgets[x]);
                    }

                });

    }

};