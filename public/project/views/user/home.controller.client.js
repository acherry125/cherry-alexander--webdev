
(function() {
    angular
        .module("EventHorizon")
        .controller("HomeController", HomeController);


    function HomeController($routeParams, $location, $rootScope, UserService) {
        vm = this;
        userId = $routeParams.uid;
        vm.uid = userId;
        
        
        
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
                )
        }
        
        init();


    }

})();
