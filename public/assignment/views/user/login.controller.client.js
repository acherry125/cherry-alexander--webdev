

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
                .then(function(response) {
                    console.log(response);
                    var user = response.data;
                    if(user._id) {
                        var id = user._id;
                        $location.url("/user/" + id);
                    } else {
                        vm.login_error = "User not found";
                    }
                });
        }
    }
})();