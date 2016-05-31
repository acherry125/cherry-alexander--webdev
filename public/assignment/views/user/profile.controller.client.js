

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, $location, UserService) {
        // referring to self (View Model)
        var vm = this;
        vm.updateUser = updateUser;

        var uid = $routeParams["uid"];
        vm.uId = uid;

        function init() {

            UserService
                .findUserById(uid)
                .then(function(response) {
                    // get this from github ughhhhhhhhhhh
                   if(response.data) {
                       vm.user = response.data;
                   }
                    if(!vm.user) {
                        $location.url("/");
                    }
                });


        }

        init();

        function updateUser() {
            if (vm.user ) {
                UserService.updateUser(uid, vm.user);
                vm.success = "User succesfully updated their profile";
            } else {
                vm.failure = "Error: User does not exist, cannot update non-existent user";
            }
        }
    }
})();