module.exports = function() {

    var mongoose = require('mongoose');
    
    var userModel = require("./user/user.model.server.js")(mongoose);
    
    var models = {
        userModel: userModel
    };

    return models;
};