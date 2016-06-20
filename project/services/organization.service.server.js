module.exports = function(app, models) {

    var organizationModel = models.organizationModel;

    // create an organization for a user
    app.post("/api/project/user/:uid/organization", createOrganization);
    // update an organization
    app.put("/api/project/organization/:oid", updateOrganization);
    // remove an organization
    app.delete("/api/project/organization/:oid", removeOrganization);
    // find an organization by id
    app.get("/api/project/organization/:oid", findOrganizationById);
    // find all organizations for a poster
    app.get("/api/project/user/:uid/organization", findOrganizationForPoster);

    // create an organization for a user
    function createOrganization(req, res) {
        res.sendStatus(200);
    }

    // update an organization
    function updateOrganization(req, res) {
        res.sendStatus(200);
    }

    // remove an organization
    function removeOrganization(req, res) {
        res.sendStatus(200);
    }

    // find an organization by id
    function findOrganizationById(req,res) {
        res.sendStatus(200);
    }

    // find all organizations for a poster
    function findOrganizationForPoster(req, res) {
        res.sendStatus(200);
    }
    
};