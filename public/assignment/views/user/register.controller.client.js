

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

    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
        vm.register = register;
        var verifyRegistration = verifyRegistration;


        /* Registers a new user */
        function register(username, password, verify) {
            vm.dupUser = false;
            if(verifyLocally(username, password, verify)) {
                vm.error = "";
                vm.info = "Creating user...";
                newUser = {username: username, password: password, verify: verify};
                UserService
                    .register(newUser)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        },
                        function (error) {
                            vm.info = "";
                            vm.dupUser = true;
                            vm.error = error.data;
                        }
                    )
            }
            
        };

        /* helper function to verify registration form */
        function verifyLocally(username, password, verify) {
            var successClass = "form-group";
            var errorClass = "form-group has-error";
            var uClass, pClass, vClass;

            if(!(username && password && verify)) {
                vm.error = "All fields must be filled in";

            }
            // check passwords match
            else if (!(password === verify)) {
                vm.error = "Password and Verify Password fields must match";
                vm.matchError = true;
            }
            // success
            else {
                vm.matchError = false;
                return true;
            }
        };


    }
})();