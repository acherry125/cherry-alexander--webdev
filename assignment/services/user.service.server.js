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

    // handle user queries
    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            // pass response so this function can respond too
            findUserByCredentials(username, password, res);
            console.log("credential")
        } else if(username) {
            findUserByUsername(username, res);
            console.log("username")
        } else {
            console.log("other stuff")
            res.send(users);
        }
    }

    function findUserById(req, res){
        var userId = req.params.userId;
        for(var i in users) {
            if (users[i]._id === userId) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByUsername(username, res){
        for(var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserByCredentials(username, password, res){
        for(var i in users) {
            if (users[i].username === username && users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }
    
}