module.exports = function(app, models) {

    var userModel = models.userModel;

    // respond to user queries
    app.get("/event/api/user", getUsers);
    // login
    app.post("/event/api/login", login);
    // respond to request for specific user
    app.get("/event/api/user/:userId", findUserById);
    // update a user
    app.put("/event/api/user/:userId", updateUser);
    // delete a user
    app.delete("/event/api/user/:userId", deleteUser);
    // Create a user
    app.post("/event/api/user", createUser);

    function login(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user === null) {
                        res.status(401).send("User and password pair not found")
                    } else{
                        res.json(user);
                    }
                },
                function(error) {
                    res.status(401).send("User  not found")
                }
            );
    }


    // handle user queries
    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            // pass response so this function can respond too
            findUserByCredentials(username, password, req, res);
        } else if(username) {
            findUserByUsername(username, res);
        }
    }

    // find a user by their id
    function findUserById(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if(user === null) {
                        res.status(400).send("User " + userId + " not found")
                    } else {
                        res.json(user);
                    }
                },
                function(error) {
                    res.status(400).send("User " + userId + " not found")
                }
            );
    }

    // find a user by their username
    function findUserByUsername(username, res){
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user === null) {
                        res.status(404).send("User " + username + " not found");
                    } else{
                        res.json(user);
                    }
                },
                function(error) {
                    console.log("creds error");
                    res.status(404).send("User " + username + " not found");
                }
            );
    }

    // find a user by their username and password
    function findUserByCredentials(username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user === null) {
                        res.status(400).send("User and password pair not found")
                    } else{
                        res.json(user);
                    }
                },
                function(error) {
                    res.status(401).send("User not found")
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(
                function(user) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(400).send("User " + userId + " cannot be updated")
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function(user) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.status(404).send("User with ID"+ userId + "not found");
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        // check if password and verify match
        if (!(newUser.password === newUser.verify)) {
            res.status(400).send("Password and Verify Password must match");
            return;
        }
        // check if the username is in the database already
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(response) {
                    // user is not in database, create user
                    if(response === null) {
                        createUserHelper(newUser, res);
                    } else{
                        // user is in the database, do not create user
                        res.status(400).send("Username is already taken");
                    }
                },
                // database error, fire error
                function(error) {
                    res.status(400).send("Could not register user");
                }
            )
    }

    // after initial checks, actually create the user
    function createUserHelper(newUser, res) {
        // create the user
        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user._id);
                },
                function(error) {
                    res.status(400).send("Cannot create user");
                }
            );
    }

};