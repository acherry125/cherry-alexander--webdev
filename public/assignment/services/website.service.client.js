
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function UserService() {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;
        function createWebsite(userId, website) {
            users.push(user);
        }

        function findWebsiteByUser(userId) {
            var result = [];
            for(var i in websites) {
                if(websites[i]._id == userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for (var i in users) {
                if (users[i].username === id) {
                    return users[i];
                }
            }
            return false;
        }

        function updateWebsite(websiteId, website) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
            return -1;
        }
    }

})();
