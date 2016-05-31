
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

        /* Adds a new user to the database */
        function createUser(user) {
            users.push(user);
        }

        /* Finds a user by its id */
        function findUserById(userId) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    return users[i];
                }
            }
        }

        /* Finds a user by its username */
        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
        }

        /* Find a user by its username and password */
        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
        }

        /* Update a user with new information */
        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    return;
                }
            }
        }

        /* Delete a user */
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