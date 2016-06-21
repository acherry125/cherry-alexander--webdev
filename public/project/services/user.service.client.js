// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            "followEvent": followEvent,
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
        
        /* has the given user follow the given event */
        function followEvent(userId, event) {
            var url = "/api/project/user/" + userId + "/event/";
            return $http.put(url, event)
        }
        
        /* Adds a new user to the database */
        function register(user) {
            var url = "/api/project/register";
            return $http.post(url, user);
        }

        /* Finds a user by its id */
        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url);
        }

        /* Finds a user by its username */
        function findUserByUsername(username) {
            var url = "/api/project/user?username=" + username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/project/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        /* Update a user with new information */
        function updateUser(userId, user) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, user);
        }

        /* Delete a user */
        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }

        /* logout */
        function logout() {
            var url = "/api/project/logout";
            return $http.post(url);
        }

        function checkLoggedIn() {
            var url = "/api/project/loggedIn";
            return $http.get(url);
        }
    }

})();