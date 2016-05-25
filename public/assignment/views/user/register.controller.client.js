

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
                newUser = {_id: "567", username: username, password: password, firstName: "", lastName: ""};
                UserService.createUser(newUser);
                $location.url("/user/567");
            }
        }

        function verifyRegistration(username, password, verify) {
            if (false) {
                vm.userFailure = "Username is already taken";
                vm.passwordVerFail = "Password and Verify Password fields must match";
            }
            // check username available (finduserbyusername)
            else if (false) {
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