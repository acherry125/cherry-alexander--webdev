

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


        /* Registers a new user */
        function register(username, password, verify) {
            if(verifyLocally(username, password, verify)) {
                newUser = {username: username, password: password, verify: verify};
                UserService
                    .createUser(newUser)
                    .then(
                        function (response) {
                            $location.url("/user/" + response.data);
                        },
                        function (error) {
                            vm.error = error.data;
                        }
                    )
            }
            
        };

        /* helper function to verify registration form */
        function verifyLocally(username, password, verify) {
            if(!(username && password && verify)) {
                vm.error = "All fields must be filled in"
            }
            // check passwords match
            else if (!(password === verify)) {
                vm.error = "Password and Verify Password fields must match";
            }
            // success
            else {
                return true;
            }
        };


    }
})();