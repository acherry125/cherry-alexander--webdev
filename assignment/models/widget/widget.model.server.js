
module.exports = function() {

    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")(mongoose);
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById" : findWebsiteById,
        "createWebsite" : createWebsite,
        "updateWebsite" : updateWebsite,
        "deleteWebsite" : deleteWebsite
    };

    return api;


    function findAllWebsitesForUser(userId) {
        return Widget.find({_user: userId})
    }

    function findWebsiteById(websiteId) {
        return Widget.findOne({_id: websiteId})
    }

    function createWebsite(website) {
        return Widget.create(website);
    }

    function updateWebsite(websiteId, website) {
        return Widget.update(
            {_id: websiteId},
            {
                $set: {
                    name: website.name,
                    description: website.description
                }
            }
        )
    }

    function deleteWebsite(websiteId) {
        return Widget.remove({_id: websiteId})
    }

};