
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationEditController", OrganizationEditController);


    function OrganizationEditController($routeParams, $location, $rootScope, OrganizationService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        vm.updateOrganization = updateOrganization;
        
        vm.user = $rootScope.currentUser;
        
        function init() {
            OrganizationService
                .findOrganizationById(organizationId)
                .then(
                    function(response) {
                        vm.org = response.data;
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
        }
        
        init();
        
        function updateOrganization() {
            OrganizationService
                .updateOrganization(organizationId, vm.org)
                .then(
                    function(response) {
                        console.log(response);
                    },
                    function(error) {
                        vm.error = error;
                    }
                )
        }
        

    }

})();
