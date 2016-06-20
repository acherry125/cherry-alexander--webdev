module.exports = function(mongoose) {

    var OrganizationSchema = require("./organization.schema.server.js")(mongoose);
    var Organization = mongoose.model("Organization", OrganizationSchema);

    var api = {
        "createOrganization": createOrganization,
        "updateOrganization": updateOrganization,
        "removeOrganization": removeOrganization,
        "findOrganizationById": findOrganizationById,
        "findOrganizationsForPoster": findOrganizationsForPoster
    };
    return api;


    function createOrganization(posterId, organization) {
        return;
    }
    
    function updateOrganization(organizationId, organization) {
        return;
    }
    
    function removeOrganization(posterId, organizationId) {
        return;
    }
    
    function findOrganizationById(organizationId) {
        return;
    }
    
    function findOrganizationsForPoster(posterId) {
        return;
    }
    
    
};
    