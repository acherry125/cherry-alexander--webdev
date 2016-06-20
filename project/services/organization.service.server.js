module.exports = function(app, models) {

    var organizationModel = models.organizationModel;

    app.post("/api/project/organization", createOrganization);

    function createOrganization(req, res) {
        res.sendStatus(200);
    }
    
};