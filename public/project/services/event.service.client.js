// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("EventService", EventService);

    function EventService($http) {

        var api = {
            "registerEvent" : registerEvent,
            "updateEvent" : updateEvent,
            "removeEvent" : removeEvent,
            "findEventById" : findEventById,
            "findEventForOrganization" : findEventForOrganization
        };

        return api;

        function registerEvent(organizationId, event) {
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

        function findEventForOrganization(organizationId) {
            return;
        }

    }

})();