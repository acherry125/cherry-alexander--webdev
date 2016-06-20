
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationFaceController", OrganizationFaceController);


    function OrganizationFaceController($routeParams, $location, $rootScope, UserService) {
        vm = this;

        vm.validatedUser = true;
        vm.messageActive = false;
        vm.toggleMessage = toggleMessage;

        vm.user = $rootScope.currentUser;


        function toggleMessage() {
            vm.messageActive = !vm.messageActive;
        }

    }

})();
