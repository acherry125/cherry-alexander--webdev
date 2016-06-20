
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationEditController", OrganizationEditController);


    function OrganizationEditController($routeParams, $location, UserService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;
        

    }

})();
