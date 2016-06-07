module.exports = function(mongoose) {
    
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);
    
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
       return User.create(user);
    }

    function updateUser() {

    }
    
    function deleteUser() {

    }
    
    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByUsername() {

    }

    function findUserByCredentials(username, password) {
        return User.findOne({username:username, password:password});
    }    
    
    
};