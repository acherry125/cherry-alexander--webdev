
(function() {
    angular
        .module("EventHorizon")
        .controller("HomeController", HomeController);


    function HomeController($routeParams, $location, $rootScope, OrganizationService, UserService, EventService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.uid = userId;
        vm.addOrganization = addOrganization;
        
        
        function init() {
            UserService
                .findUserById(userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            OrganizationService
                .findOrganizationsForPoster(userId)
                .then(
                    function(response) {
                        vm.organizations = response.data.elements;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
            // do one for events too
        }
        
        init();
        
        function addOrganization() {
            $location.url("/user/" + userId + "/addOrganization")
        }


    }

})();
