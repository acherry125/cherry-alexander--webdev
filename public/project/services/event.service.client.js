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
            "findEventsForOrganization" : findEventsForOrganization
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
            return;
        }

        function findEventsByName(eventName) {
            return;
        }

        function findEventsForOrganization(organizationId) {
            return $http.get("/api/project/organization/" + organizationId + "/event");
        }

    }

})();