
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationEditController", OrganizationEditController);


    function OrganizationEditController($routeParams, $location, $rootScope, UserService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        
        vm.user = $rootScope.currentUser;
        

    }

})();
