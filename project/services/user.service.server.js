module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    // respond to user queries
    app.get("/api/user", getUsers);
    // respond to request for specific user
    app.get("/api/user/:userId", findUserById);
    // update a user
    app.put("/api/user/:userId", updateUser);
    // delete a user
    app.delete("/api/user/:userId", deleteUser);
    // Create a user
    app.post("/api/user", createUser);


    // handle user queries
    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            // pass response so this function can respond too
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        }
    }

    // find a user by their id
    function findUserById(req, res){
        var userId = req.params.userId;
        for(var i in users) {
            if (users[i]._id === userId) {
                res.send(users[i]);
                return;
            }
        }
        res.status(404).send("User " + userId + " not found");
    }

    // find a user by their username
    function findUserByUsername(username, res){
        for(var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.status(404).send("User " + username + " not found");
    }

    // find a user by their username and password
    function findUserByCredentials(username, password, res){
        for(var i in users) {
            if (users[i].username === username && users[i].password === password) {
                res.send(users[i]._id);
                return;
            }
        }
        res.status(401).send("User " + username + " not found");
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;
        for (var i in users) {
            if (users[i]._id === id) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                res.sendStatus(200)
                return;
            }
        }
        res.status(404).send("User with ID"+ id + "not found");
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("User with ID"+ id + "not found");
    }

    function createUser(req, res) {
        var newUser = req.body;
        for (var i in users) {
            if(users[i].username === newUser.username) {
                res.status(403).send("Username " + newUser.username + " is already in use");
                return;
            }
        } 
        if (!(newUser.password === newUser.verify)) {
            res.status(403).send("Password and Verify Password must match");
        } else {
            var id = (new Date()).getTime() + "";
            res.send(id);
            var user = {_id: id, username: newUser.username, password: newUser.password};
            users.push(user);
        }
    }

};