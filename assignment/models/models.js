module.exports = function() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/webdev');

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel;
    var pageModel;
    var widgetModel;

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};