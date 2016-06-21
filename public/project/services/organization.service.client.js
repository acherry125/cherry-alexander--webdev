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
            "findOrganizationForPoster" : findOrganizationForPoster
        };

        return api;

        function registerOrganization(posterId, organization) {
            return $http.post("/api/project/user/" + posterId + "/organization", event)
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
        
        function findOrganizationForPoster(posterId) {
            return;
        }
    }

})();