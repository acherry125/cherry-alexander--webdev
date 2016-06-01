

(function() {
    angular
        .module("WebAppMaker")
        // naming controller and binding it to function
        .controller("LoginController", LoginController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

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