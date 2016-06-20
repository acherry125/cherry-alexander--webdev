var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    // login
    // if passport approves request, login is invoked. Else 403
    app.post("/api/project/login", passport.authenticate('EventHorizon'), login);
    // Create a user
    app.post("/api/project/register", register);
    app.post("/api/project/logout", logout);
    // respond to user queries
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.get("/api/project/loggedIn", loggedIn);
    // update a user
    app.put("/api/project/user/:userId", updateUser);
    // delete a user
    app.delete("/api/project/user/:userId", deleteUser);

    passport.use('EventHorizon', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // called right before sending to the client, this is what is put in the cookie
    function serializeUser(user, done) {
        // places the entire user in the cookie
        done(null, user);
    }

    // handles the cookie the browser gives back after they login
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(error) {
                    done(error, null);
                }
            )
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    // no such user
                    if (user === null) {
                        return done(null, false);
                        // password correct!
                    } else if (bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                        // password incorrect
                    } else {
                        return done(null, false);
                    }
                },
                // database error
                function(error) {
                    if (error) {
                        return done(error);
                    }
                }
            );
    }

    function login(req, res) {
        // passport places this user here
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var verify = req.body.verify;
        userModel
            // find username
            .findUserByUsername(username)
            // username check complete
            .then(
                // database successful
                function(user) {
                    if(user !== null) {
                        res.status(401).send("User already exists");
                    } else if (password != verify) {
                        res.status(401).send("Password and Verify Password Fields must match");
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body)
                    }
                },
                // database error
                function(error) {
                    res.status(400).send(error);
                }
            )
            // userModel.createUser returns to then and then goes here
            // createUser request completed
            .then(
                // database success
                function(user) {
                    if(user) {
                        // passport doesn't support promises, so we pass it a callback function
                        req.login(user, function(error) {
                            if(error) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    // logout
    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send("0");
        }
    }

    // handle user queries
    function getUsers(req, res) {
        var username = req.query.username;
        findUserByUsername(username, req, res);
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
                        user.password = "";
                        res.json(user);
                    }
                },
                function(error) {
                    res.status(400).send("User " + userId + " not found")
                }
            );
    }

    // find a user by their username
    function findUserByUsername(username, req, res){
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


};