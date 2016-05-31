
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };

        return api;

        /* Adds a new widget to the database */
        function createWidget(pageId, widget) {
            widget["pageId"] = pageId;
            widgets.push(widget);
        }

        /* Finds a widget by its page's id */
        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var i in widgets) {
                if(widgets[i].pageId == pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        /* Finds a widget by its id */
        function findWidgetById(widgetId) {
            var result = [];
            for(var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
        }

        /* Update a widget with new information */
        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return;
                }
            }
        }

        /* Deletes a widget */
        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return;
                }
            }
        }

    }


})();