

(function() {
    angular
        .module("WebAppMaker")
        // naming controller and binding it to function
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];
    
    function RegisterController() {

    }

    function ProfileController($routeParams, $location, UserService) {
        // referring to self (View Model)
        var vm = this;
        vm.updateUser = updateUser;
        vm.navigateToProfile = navigateToProfile;
        
        var id = $routeParams["uid"];
        vm.uId = id;

        function init() {
            vm.user = UserService.findUserById(vm.uId);
        }

        init();
        function updateUser() {
            if (vm.user) {
                vm.user.firstName = vm.user.firstName;
                vm.user.LastName = vm.user.LastName;
                vm.success = "User succesfully updated their profile";
            } else {
                vm.failure = "Error: User does not exist, cannot update non-existent user";
            }
        }
        
        function navigateToProfile() {
            $location.url("/user/" + id);
        }
    }

    function LoginController($location, UserService) {
        // referring to self (View Model)
        var vm = this;
        // verifies login credentials
        vm.login = login;
        
        // login handler
        function login(username, password) {
            user = UserService.findUserByCredentials(username, password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.login_error = "Unable to login";
            }
        }
    }
})();