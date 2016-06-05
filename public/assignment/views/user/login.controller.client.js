

(function() {
    angular
        .module("WebAppMaker")
        // naming controller and binding it to function
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        // referring to self (View Model)
        var vm = this;
        // verifies login credentials
        vm.login = login;

        // login handler
        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                // when the server responds
                .then(
                    function(response) {
                        var id = response.data;
                        $location.url("/user/" + id);
                    },
                    function(error) {
                        vm.error = "User not found";
                    });
        }
    }
})();