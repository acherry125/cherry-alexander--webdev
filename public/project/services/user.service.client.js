// angular function
(function() {
    angular
        .module("EventHorizon")
        .factory("UserService", UserService);

    function UserService($http) {
        
        var loginRedirect = "";

        var api = {
            "followEvent": followEvent,
            "unfollowEvent": unfollowEvent,
            "register": register,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "login": login,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "logout": logout,
            "checkLoggedIn": checkLoggedIn,
            "sendMessage": sendMessage,
            "deleteMessage": deleteMessage,
            "setLoginRedirect": setLoginRedirect,
            "getLoginRedirect": getLoginRedirect
        };

        return api;
        
        function getLoginRedirect() {
            return loginRedirect;
        }

        function setLoginRedirect(newUrl) {
            loginRedirect = newUrl;
        }
        
        /* has the given user follow the given event */
        function followEvent(userId, event) {
            var url = "/api/project/user/" + userId + "/event/";
            return $http.put(url, event)
        }

        /* unfollows an event */
        function unfollowEvent(userId, eventId) {
            var url = "/api/project/user/" + userId + "/event/" + eventId;
            return $http.delete(url);
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

        function sendMessage(recipient, from, message) {
            message.from = from;
            message._id = new Date();
            var url = "/api/project/user/" + recipient + "/message";
            return $http.post(url, message);
        }

        function deleteMessage(userId, messageId) {
            var url = "/api/project/user/" + userId + "/message/" + messageId;
            return $http.delete(url);
        }
    }

})();