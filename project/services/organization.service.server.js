module.exports = function(app, models) {

    var organizationModel = models.organizationModel;
    var userModel = models.userModel;

    // create an organization for a user
    app.post("/api/project/user/:uid/organization", createOrganization);
    // update an organization
    app.put("/api/project/organization/:oid", updateOrganization);
    // remove an organization
    app.delete("/api/project/organization/:oid", removeOrganization);
    // find an organization by id
    app.get("/api/project/organization/:oid", findOrganizationById);
    // find organizations by name (has query param)
    app.get("/api/project/organization", findOrganizationsByName);
    // find all organizations for a poster
    app.get("/api/project/user/:uid/organization", findOrganizationsForPoster);

    // create an organization for a user
    function createOrganization(req, res) {
        var organization = req.body;
        var posterId = req.params.uid;

        if(!organization || !organization.name) {
            res.status(400).send("Organization must have a name");
            return;
        }

        organizationModel
            .createOrganization(posterId, organization)
            .then(
                function(org) {
                    if(org) {
                        res.sendStatus(200);
                    }
                },
                function(error) {
                    // think about what error to send
                    res.send(error);
                }
            );

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
        var organizationId = req.params.oid;
        organizationModel
            .findOrganizationById(organizationId)
            .then(
                function(organization) {
                    if(organization === null) {
                        res.status(404).send("Organization not found")
                    } else {
                        res.json(organization);
                    }
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // find organizations by name
    function findOrganizationsByName(req,res) {
        res.sendStatus(200);
    }

    // find all organizations for a poster
    function findOrganizationsForPoster(req, res) {
        var posterId = req.params.uid;
        organizationModel
            .findOrganizationsForPoster(posterId)
            .then(
                function(organizations) {
                    res.json({elements : organizations});
                },
                function(error) {
                    res.send(error);
                }
            );
    }
    
};