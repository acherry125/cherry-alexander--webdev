

(function() {
    angular
        .module("EventHorizon")
        // naming controller and binding it to function
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        // referring to self (View Model)
        var vm = this;
        // verifies login credentials
        vm.login = login;
        vm.goBack = goBack;
        var cancelRedirect = "/landing";
        var successRedirect = "";

        function init() {
            var newRedirect = UserService.getLoginRedirect();
            if(newRedirect) {
                cancelRedirect = newRedirect;
                successRedirect = newRedirect;
            }
        }

        init();

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
                            if(!successRedirect) {
                                var id = user._id;
                                $location.url("/user/" + id);
                            } else {
                                $location.url(successRedirect);
                            }

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
            $location.url(cancelRedirect);
        }
    }
})();