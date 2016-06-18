

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, $location, $rootScope, UserService) {
        // referring to self (View Model)
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        // user id
        var uid = $routeParams.uid;
        vm.uId = uid;

        function init() {            

            UserService
                .findUserById(uid)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    // missing user
                    function(error) {
                        $location.url("/");
                    }
                );
        }

        init();

        function updateUser() {
            UserService
                .updateUser(uid, vm.user)
                .then(
                    function(response) {
                        vm.success = "User succesfully updated their profile";
                    },
                    function(error) {
                        vm.failure = error.data;
                    }
                );
        }
        
        function unregister() {
            if (confirm('Are you sure you want to delete your profile?')) {
                UserService
                    .deleteUser(uid)
                    .then(
                        function(response) {
                            $location.url("/");
                        },
                        function(error) {
                            vm.error = error.data;
                        }
                    )
            } else {
                // Do nothing!
            }
        }
        
        function logout() {
            $rootScope.currentUser = null;
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    },
                    function(error) {
                        $location.url("/");
                    }
                )
        }
    }
})();