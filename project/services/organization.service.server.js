module.exports = function(app, models) {

    var organizationModel = models.organizationModel;

    // create an organization for a user
    app.post("/api/project/organization", createOrganization);
    // update an organization
    app.put("/api/project/organization/:oid", updateOrganization);
    // remove an organization
    app.delete("/api/project/organization", removeOrganization);
    // find an organization by id
    app.get("/api/project/organization/:oid", findOrganizationById);
    // find all organizations for a poster
    app.get("/api/project/user/:uid/organization", findOrganizationForPoster);

    function createOrganization(req, res) {
        res.sendStatus(200);
    }

    function updateOrganization(req, res) {
        res.sendStatus(200);
    }

    function removeOrganization(req, res) {
        res.sendStatus(200);
    }

    function findOrganizationById(req,res) {
        res.sendStatus(200);
    }

    function findOrganizationForPoster(req, res) {
        res.sendStatus(200);
    }
    
};