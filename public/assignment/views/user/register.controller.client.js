

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;
        var verifyRegistration = verifyRegistration;

        function register(username, password, verify) {
            // verify, assign id, add to database
            if (verifyRegistration(username, password, verify)) {
                var unique = Date.now();
                uniqe = unique.toString();
                newUser = {_id: unique, username: username, password: password, firstName: "", lastName: ""};
                UserService.createUser(newUser);
                $location.url("/user/" + unique);
            }
        }

        function verifyRegistration(username, password, verify) {
            // check username available (finduserbyusername)
            if (UserService.findUserByUsername(username)) {
                vm.failure = "Username is already taken";
            } else if(!(username && password && verify)) {
                vm.failure = "All fields must be filled in"
            }
            // check passwords match
            else if (!(password === verify)) {
                vm.failure = "Password and Verify Password fields must match";
            }
            // success
            else {
                return true;
            }
        }


    }
})();