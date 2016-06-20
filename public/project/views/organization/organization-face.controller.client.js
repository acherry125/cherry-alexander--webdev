
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationFaceController", OrganizationFaceController);


    function OrganizationFaceController($routeParams, $location, $rootScope, OrganizationService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;

        vm.validatedUser = true;
        vm.messageActive = false;
        vm.toggleMessage = toggleMessage;
        vm.addEvent = addEvent;

        vm.user = $rootScope.currentUser;


        function toggleMessage() {
            vm.messageActive = !vm.messageActive;
        }

        function addEvent() {
            $location.url("/organization/" + organizationId + "/addEvent");
        }

    }

})();
