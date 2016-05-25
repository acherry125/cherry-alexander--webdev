
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
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
        function createUser(user) {
            users.push(user);
        }

        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    return users[i];
                }
            }
            return false;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === id) {
                    return users[i];
                }
            }
            return false;
        }

        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
        }

        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
            return -1;
        }

        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    return;
                }
            }
            return -1;
        }
    }

})();