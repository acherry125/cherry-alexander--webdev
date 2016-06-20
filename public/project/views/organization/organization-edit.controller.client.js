
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
            return;
        }
        
        init();
        
        function updateOrganization() {
            return;
        }
        

    }

})();
