
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationFaceController", OrganizationFaceController);


    function OrganizationFaceController($routeParams, $location, UserService) {
        vm = this;

        vm.validatedUser = true;

    }

})();
