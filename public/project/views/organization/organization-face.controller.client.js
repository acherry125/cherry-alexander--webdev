
(function() {
    angular
        .module("EventHorizon")
        .controller("OrganizationFaceController", OrganizationFaceController);


    function OrganizationFaceController($routeParams, $location, $rootScope, EventService, OrganizationService, UserService) {
        vm = this;
        var organizationId = $routeParams.oid;
        vm.oid = organizationId;

        vm.validatedUser = true;
        vm.messageActive = false;
        vm.toggleMessage = toggleMessage;
        vm.addEvent = addEvent;
        vm.editOrganization = editOrganization;

        vm.user = $rootScope.currentUser;

        function init() {
            OrganizationService
                .findOrganizationById(organizationId)
                .then(
                    function(response) {
                        // location does not work
                        vm.org = response.data;
                        return UserService.findUserById(vm.org._poster);
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
                .then(
                    function(response) {
                        vm.posterName = response.data.username;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
            
            EventService
                .findEventsForOrganization(organizationId)
                .then(
                    function(response) {
                        vm.events = response.data.elements;
                    },
                    function(error) {
                        vm.error = "";
                    }
                )
        }
        
        init();
        
        function toggleMessage() {
            vm.messageActive = !vm.messageActive;
        }

        function addEvent() {
            $location.url("/organization/" + organizationId + "/addEvent");
        }

        function editOrganization() {
            $location.url("/organization/" + organizationId + "/edit");
        }

    }

})();
