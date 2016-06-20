

(function() {
    angular
        .module("EventHorizon")
        // naming controller and binding it to function
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService, $rootScope) {
        // referring to self (View Model)
        var vm = this;
        // verifies login credentials
        vm.login = login;
        vm.goBack = goBack;

        // login handler
        function login(username, password) {
            if(verifyLogin(username, password)) {
                vm.error = "";
                vm.info = "Checking for user...";
                UserService
                    .login(username, password)
                    // when the server responds
                    .then(
                        function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            var id = user._id;
                            $location.url("/user/" + id);
                        },
                        function(error) {
                            vm.info = "";
                            // figure out why this doesn't display
                            vm.error = "Invalid username password combination";
                            vm.wrongError = true;
                        });
            } else {
                vm.error = "Please enter a Username and Password";
                vm.wrongError = false;
            }
        }

        function verifyLogin(username, password) {
            return (username && password);
        }
        
        function goBack() {
            $location.url("/")
        }
    }
})();