
(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "reorderWidgets": reorderWidget
        };

        return api;

        /* Adds a new widget to the database */
        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        /* Finds a widget by its page's id */
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        /* Finds a widget by its id */
        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        /* Update a widget with new information */
        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId; 
            return $http.put(url, widget);
        }

        /* Deletes a widget */
        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        /* Updates Server with new widget Order */
        function reorderWidgets(pageId, startInd, endInd) {
            var url = "/page/" + pageId + "/widget?start=" + startInd + "&end=" + endInd;
            return $http.put(url)
        }

    }


})();