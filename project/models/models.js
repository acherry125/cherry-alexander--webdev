module.exports = function() {

    var mongoose = require('mongoose');
    
    var userModel = require("./user/user.model.server.js")(mongoose);
    var organizationModel = require("./user/organization.model.server.js")(mongoose);
    var eventModel = require("./user/event.model.server.js")(mongoose);


    var models = {
        userModel: userModel
    };

    return models;
};