
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
        
        /* defined in config resolve function */
        vm.user = $rootScope.currentUser;
        
        /* initiates page */
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

        /* Update an organization with new information */
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

        /* verify that organization has all required fields */
        function verifyOrganization(org) {
            if(!org || !org.name) {
                vm.error = "Organization must have a name";
                return false;
            } else {
                vm.error = "";
                return true;
            }
        }

        /* deletes the organization */
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
