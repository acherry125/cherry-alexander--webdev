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
            return $http.post("/api/project/organization/" + organizationId + "/event", event);
        }

        function updateEvent(eventId, event) {
            return;
        }

        function removeEvent(eventId) {
            return;
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
            return $http.get("/api/project/organization/" + organizationId + "/event");
        }
        
        function findAllEvents() {
            var url = "/api/project/event";
            return $http.get(url)
        }

    }

})();