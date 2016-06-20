// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("EventService", EventService);

    function EventService($http) {

        var api = {
            "registerOrganization" : registerOrganization,
            "updateOrganization" : updateOrganization,
            "removeOrganization" : removeOrganization,
            "findOrganizationById" : findOrganizationById,
            "findOrganizationByPoster" : findOrganizationByPoster
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