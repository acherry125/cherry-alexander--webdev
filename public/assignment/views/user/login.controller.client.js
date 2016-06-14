

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
            if(verifyLogin(username, password)) {
                UserService
                    .login(username, password)
                    // when the server responds
                    .then(
                        function(response) {
                            var id = response.data._id;
                            $location.url("/user/" + id);
                        },
                        function(error) {
                            vm.error = error.data;
                        });
            } else {
                vm.error = "Please enter a Username and Password";
                vm.name_failure = true;
                vm.password_failure = true;
            }
        }

        function verifyLogin(username, password) {
            return (username && password);
        }
    }
})();