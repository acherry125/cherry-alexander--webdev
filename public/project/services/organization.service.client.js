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
            "findOrganizationsByName" : findOrganizationsByName,
            "findOrganizationsForPoster" : findOrganizationsForPoster
        };

        return api;

        function createOrganization(posterId, organization) {
            var url = "/api/project/user/" + posterId + "/organization";
            return $http.post(url, organization)
        }
        
        function updateOrganization(organizationId, organization) {
            var url = "/api/project/organization/" + organizationId;
            return $http.put(url, organization);
        }
        
        function removeOrganization(organizationId) {
            var url = "/api/project/organization/" + organizationId;
            return $http.delete(url)        
        }
        
        
        function findOrganizationById(organizationId) {
            var url = "/api/project/organization/" + organizationId;
            return $http.get(url)
        }

        function findOrganizationsByName(organizationName) {
            var url = "/api/project/organization?orgName=" + organizationName;
            return $http.get(url);
        }
        
        function findOrganizationsForPoster(posterId) {
            var url = "/api/project/user/" + posterId + "/organization";
            return $http.get(url)
        }
    }

})();