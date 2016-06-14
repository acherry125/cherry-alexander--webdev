// angular function
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "createUser": createUser,
            "register": register,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn
        };

        return api;

        /* Adds a new user to the database */
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        /* Adds a new user to the database */
        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }

        /* Finds a user by its id */
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        /* Finds a user by its username */
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        /* Find a user by its username and password */
        function findUserByCredentials(username, password) {
            var url = "/api/login?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        /* Update a user with new information */
        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        /* Delete a user */
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }
        
        /* logout */
        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }
        
        function checkLoggedIn() {
            var url = "/api/loggedIn";
            return $http.get(url);
        }
    }

})();