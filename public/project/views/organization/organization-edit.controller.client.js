
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationEditController", OrganizationEditController);


    function OrganizationEditController($routeParams, $location, $rootScope, OrganizationService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        vm.updateOrganization = updateOrganization;
        vm.deleteOrganization = deleteOrganization;
        
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
            if(verifyOrganization(vm.org)) {
                OrganizationService
                    .updateOrganization(organizationId, vm.org)
                    .then(
                        function(response) {
                            $location.url("/organization/" + organizationId)
                        },
                        function(error) {
                            vm.error = error;
                        }
                    )
            }

        }

        function verifyOrganization(org) {
            if(!org || !org.name) {
                vm.error = "Organization must have a name";
                return false;
            }
        }

        function deleteOrganization() {
            OrganizationService
                .removeOrganization(organizationId)
                .then(
                    function(response) {
                        $location.url("/user/" + vm.org._poster);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }

    }

})();
