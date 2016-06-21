
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationAddController", OrganizationAddController);


    function OrganizationAddController($routeParams, $location, $rootScope, OrganizationService) {
        vm = this;
        var posterId = $routeParams.uid;
        vm.uid = posterId;
        vm.createOrganization = createOrganization;
        vm.user = $rootScope.currentUser;

        function init() {
            return;
        }

        init();

        function createOrganization() {
            if(verifyOrganization(vm.org)) {
                OrganizationService
                    .createOrganization(posterId, vm.org)
                    .then(
                        function(response) {
                            $location.url("/user/" + posterId);
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            }
        }

        function verifyOrganization(org) {
            if(!org || !org.name) {
                vm.error = "Name field is required";
                return false;
            } else {
                vm.error = "";
                return true;
            }
        }

    }

})();