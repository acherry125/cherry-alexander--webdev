// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("EventService", EventService);

    function EventService($http) {

        var api = {
            "createEvent" : createEvent,
            "updateEvent" : updateEvent,
            "removeEvent" : removeEvent,
            "findEventById" : findEventById,
            "findEventsByName" : findEventsByName,
            "findEventsForOrganization" : findEventsForOrganization,
            "findAllEvents": findAllEvents
        };

        return api;

        function createEvent(organizationId, event) {
            var url = "/api/project/organization/" + organizationId + "/event";
            return $http.post(url, event);
        }

        function updateEvent(eventId, event) {
            var url = "/api/project/event/" + eventId;
            return $http.put(url, event)
        }

        function removeEvent(eventId) {
            var url = "/api/project/event/" + eventId;
            return $http.delete(url);
        }

        function findEventById(eventId) {
            var url = "/api/project/event/" + eventId;
            return $http.get(url);
        }

        function findEventsByName(eventName) {
            var url = "/api/project/event?eventName=" + eventName;
            return $http.get(url)
        }

        function findEventsForOrganization(organizationId) {
            var url = "/api/project/organization/" + organizationId + "/event";
            return $http.get(url);
        }
        
        function findAllEvents() {
            var url = "/api/project/event";
            return $http.get(url)
        }

    }

})();