

(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

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