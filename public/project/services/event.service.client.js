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
            "findEventsByName" : findEventByName,
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

        function findsEventsForOrganization(organizationId) {
            return;
        }

    }

})();