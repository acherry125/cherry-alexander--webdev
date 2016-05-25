

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);


    function ProfileController($routeParams, $location, UserService) {
        // referring to self (View Model)
        var vm = this;
        vm.updateUser = updateUser;
        vm.navigateToProfile = navigateToProfile;
        
        var id = $routeParams["uid"];
        vm.uId = id;

        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
        }

        init();
        
        function updateUser() {
            if (vm.user) {
                UserService.updateUser(id, vm.user);
                vm.success = "User succesfully updated their profile";
            } else {
                vm.failure = "Error: User does not exist, cannot update non-existent user";
            }
        }

        function navigateToProfile() {
            $location.url("/user/" + id);
        }
    }
})();