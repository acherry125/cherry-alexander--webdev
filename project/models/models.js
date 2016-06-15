module.exports = function() {

    var mongoose = require('mongoose');
    
    var userModel = require("./user/user.model.server.js")(mongoose);
    var plannerModel = require("./planner/planner.model.server.js")(mongoose);
    
    var models = {
        userModel: userModel,
        plannerModel: plannerModel
    };

    return models;
};