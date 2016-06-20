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
            "findEventByOrganization" : findEventByOrganization
        };

        return api;

        function registerEvent(organizationId, eventName) {
            return;
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

        function findEventByOrganization(organizationId) {
            return;
        }

    }

})();