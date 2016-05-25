

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

    function RegisterController(UserService) {
        var vm = this;
        vm.register = verifyRegistration();
        var verifyRegistration = verifyRegistration;

        function register(username, password, verify) {
            // verify, assign id, add to database
        }

        function verifyRegistration(username, password, verify) {
            // check username available, passwords match
            if (!(password === verify)) {
                vm.passwordVerFail = "Password and Verify Password fields must match"
            }
            else {
                newUser = {_id: "567", username: "alex", password: "alex", firstName: "", lastName: ""};
                UserService.createUser(newUser)
            }
        }


    }
})();