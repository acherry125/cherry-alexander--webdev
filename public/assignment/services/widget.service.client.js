
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    widgets = [

        { "_id": "123", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 2, "text": "GIZMODO"},
        { "_id": "234", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "name": "giz", "widgetType": "IMAGE", "pageId": "321",
            "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "name": "giz", "widgetType": "HTML", "pageId": "321",
            "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "name": "giz", "widgetType": "HEADER", "pageId": "321",
            "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "name": "giz", "widgetType": "YOUTUBE", "pageId": "321",
            "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "name": "giz", "widgetType": "HTML", "pageId": "321",
            "text": "<p>Lorem ipsum</p>"}

    ];

    function WidgetService() {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            widget["pageId"] = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var i in widgets) {
                if(widgets[i].pageId == pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            var result = [];
            for(var i in widgets) {
                if (widgets[i]._id == widgetId) {
                    return widgets[i];
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i] = widget;
                    return;
                }
            }
        }

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