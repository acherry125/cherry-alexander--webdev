

(function() {
    angular
        .module("WebAppMaker")
        // naming controller and binding it to function
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];
    
    function RegisterController() {

    }

    function ProfileController($routeParams) {
        // referring to self (View Model)
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams["uid"];
        var index = -1;

        function init() {
            for (var ind in users) {
                if (users[ind]._id === id) {
                    vm.user = users[ind];
                    index = ind
                }
            }
        }

        init();
        function updateUser() {
            if (index in users) {
                users[index].firstName = vm.user.firstName;
                users[index].LastName = vm.user.LastName;
                vm.success = "User succesfully updated their profile";
            } else {
                vm.failure = "Error: User does not exist, cannot update non-existent user";
            }
        }
    }

    function LoginController($location) {
        // referring to self (View Model)
        var vm = this;
        vm.login = login;
        vm.hid = "hello world";

        function login(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    $location.url("/user/" + users[i]._id);
                    return;
                } else {
                    vm.error = "User not found";
                }
            }
        }
    }
})();