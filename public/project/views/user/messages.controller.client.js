
(function() {
    angular
        .module("EventHorizon")
        .controller("UserMessagesController", UserMessagesController);


    function UserMessagesController($routeParams, $location, UserService) {
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
