// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("OrganizationService", OrganizationService);

    function OrganizationService($http) {

        var api = {
            "createOrganization" : createOrganization,
            "updateOrganization" : updateOrganization,
            "removeOrganization" : removeOrganization,
            "findOrganizationById" : findOrganizationById,
            "findOrganizationForPoster" : findOrganizationForPoster
        };

        return api;

        function createOrganization(posterId, organization) {
            var url = "/api/project/user/" + posterId + "/organization";
            return $http.post(url, organization)
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