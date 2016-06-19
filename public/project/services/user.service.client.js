// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "register": register,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn
        };

        return api;
        
        /* Adds a new user to the database */
        function register(user) {
            var url = "/event/api/register";
            return $http.post(url, user);
        }

        /* Finds a user by its id */
        function findUserById(userId) {
            var url = "/event/api/user/" + userId;
            return $http.get(url);
        }

        /* Finds a user by its username */
        function findUserByUsername(username) {
            var url = "/event/api/user?username=" + username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/event/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        /* Update a user with new information */
        function updateUser(userId, user) {
            var url = "/event/api/user/" + userId;
            return $http.put(url, user);
        }

        /* Delete a user */
        function deleteUser(userId) {
            var url = "/event/api/user/" + userId;
            return $http.delete(url);
        }

        /* logout */
        function logout() {
            var url = "/event/api/logout";
            return $http.post(url);
        }

        function checkLoggedIn() {
            var url = "/event/api/loggedIn";
            return $http.get(url);
        }
    }

})();