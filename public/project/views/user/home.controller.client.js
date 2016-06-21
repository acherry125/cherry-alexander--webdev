
(function() {
    angular
        .module("EventHorizon")
        .controller("HomeController", HomeController);


    function HomeController($routeParams, $location, $rootScope, OrganizationService, EventService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.uid = userId;
        vm.addOrganization = addOrganization;
        
        
        function init() {
            OrganizationService
                .findOrganizationForPoster(userId)
                .then(
                    function(response) {
                        vm.organizations = response.data;
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
