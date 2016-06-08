module.exports = function() {

    var mongoose = require('mongoose');
   // mongoose.connect('mongodb://localhost/test');
   mongoose.connect('mongodb://127.0.0.1:27017/test');

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose);
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