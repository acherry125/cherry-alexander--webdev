module.exports = function(mongoose) {
    
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model("EventUser", UserSchema);
    
    var api = {
        "createUser": createUser,
        "updateUser": updateUser,
        "deleteUser": deleteUser,
        "findUserById": findUserById,
        "findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials
    };
    return api;

    function createUser(user) {
        user.dateCreated = new Date();
        user.organizations = [];
        user.messages = [];
        user.followed = [];
        return User.create(user);
    }

    function updateUser(userId, newUser) {
        return User.update(
            {_id: userId},
            {$set:
                {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    poster: newUser.poster,
                    followed: newUser.followed,
                    messages: newUser.messages
                }
            }

        )
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId})
    }
    
    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByUsername(username) {
        return User.findOne({"username":username});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({"username":username, "password":password});
    }    
    
    
};