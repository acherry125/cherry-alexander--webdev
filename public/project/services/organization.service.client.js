// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("OrganizationService", OrganizationService);

    function OrganizationService($http) {

        var api = {
            "registerOrganization" : registerOrganization,
            "updateOrganization" : updateOrganization,
            "removeOrganization" : removeOrganization,
            "findOrganizationById" : findOrganizationById,
            "findOrganizationByPoster" : findOrganizationByPoster
        };

        return api;

        function registerOrganization(posterId, organizationName) {
            return;
        }
        
        function updateOrganization(organizationId, organization) {
            return;
        }
        
        function removeOrganization(organizationId) {
            return;
        } 
        
        function findOrganizationById(organizationId) {
            return;
        }
        
        function findOrganizationByPoster(posterId) {
            return;
        }
    }

})();