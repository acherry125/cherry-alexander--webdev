

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, $location, UserService) {
        // referring to self (View Model)
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        var uid = $routeParams.uid;
        vm.uId = uid;

        function init() {

            UserService
                .findUserById(uid)
                .then(function(response) {
                   if(response.data._id) {
                       vm.user = response.data;
                   }
                    if(!vm.user) {
                        $location.url("/");
                    }
                });


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
    }
})();