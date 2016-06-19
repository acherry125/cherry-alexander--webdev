module.exports = function(mongoose) {
    
    var PlannerSchema = require("./poster.schema.server.js")(mongoose);
    var Planner = mongoose.model("EventPlanner", PlannerSchema);
    
    var api = {
        "createUser": createUser,
        "updateUser": updateUser,
        "addWebsiteToUser": addWebsiteToUser,
        "deleteUser": deleteUser,
        "findUserById": findUserById,
        "findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials
    };
    return api;

    function addWebsiteToUser(userId, websiteId) {
        return Planner.update(
            {_id :userId},
            {$push: {"websites": websiteId}}
        )
    }

    function createUser(user) {
        user.dateCreated = new Date();
        return Planner.create(user);
    }

    function updateUser(userId, newUser) {
        return Planner.update(
            {_id: userId},
            {$set:
                {
                    email: newUser.email,
                    phone: newUser.phone,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            }

        )
    }
    
    function deleteUser(userId) {
        return Planner.remove({_id: userId})
    }
    
    function findUserById(userId) {
        return Planner.findById(userId);
    }
    
    function findUserByUsername(username) {
        return Planner.findOne({"username":username});
    }

    function findUserByCredentials(username, password) {
        return Planner.findOne({"username":username, "password":password});
    }    
    
    
};