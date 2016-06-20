
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
            return;
        }

    }

})();