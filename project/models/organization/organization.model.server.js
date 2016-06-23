module.exports = function(mongoose) {

    var OrganizationSchema = require("./organization.schema.server.js")(mongoose);
    var Organization = mongoose.model("Organization", OrganizationSchema);

    var api = {
        "createOrganization": createOrganization,
        "updateOrganization": updateOrganization,
        "removeOrganization": removeOrganization,
        "findOrganizationById": findOrganizationById,
        "findOrganizationsByName": findOrganizationsByName,
        "findOrganizationsForPoster": findOrganizationsForPoster
    };
    return api;


    function createOrganization(posterId, organization) {
        organization.dateCreated = new Date();
        organization._poster = posterId;
        organization.reviews = [];
        return Organization.create(organization);
    }
    
    function updateOrganization(organizationId, organization) {
        return Organization.update(
            {_id: organizationId},
            {$set:
            {
                name: organization.name,
                phone: organization.phone,
                location: organization.location,
                description: organization.description,
                reviews: organization.reviews
            }
            }

        )
    }
    
    function removeOrganization(organizationId) {
        return Organization.remove({_id: organizationId})
    }
    
    function findOrganizationsByName(organizationName) {
        return Organization.find({name: organizationName})
    }
    
    function findOrganizationById(organizationId) {
        return Organization.findById(organizationId)
    }
    
    function findOrganizationsForPoster(posterId) {
        return Organization.find({_poster: posterId})
    }
    
    
};
    