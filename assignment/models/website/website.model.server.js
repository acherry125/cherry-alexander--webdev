
module.exports = function() {

    var mongoose = require("mongoose");

    var WebsiteSchema = require("./website.schema.server.js")(mongoose);
    var Website = mongoose.model("Website", WebsiteSchema);
    
    var api = {
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById" : findWebsiteById        
    };

    return api;


    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId})
    }
    
    function findWebsiteById(websiteId) {
        return Website.find({_id: websiteId})
    }
    
    
};