module.exports = function(app, models) {

    var organizationModel = models.organizationModel;
    var userModel = models.userModel;
    var eventModel = models.eventModel;

    // create an organization for a user
    app.post("/api/project/user/:uid/organization", createOrganization);
    // add a review to an organization
    app.post("/api/project/organization/:oid/review", submitReview);
    // update an organization
    app.put("/api/project/organization/:oid", updateOrganization);
    // remove an organization
    app.delete("/api/project/organization/:oid", removeOrganization);
    // delete a comment
    app.delete("/api/project/organization/:oid/review/:rid", removeReview);
    // find an organization by id
    app.get("/api/project/organization/:oid", findOrganizationById);
    // find organizations by name (has query param)
    app.get("/api/project/organization", findOrganizationsByName);
    // find all organizations for a poster
    app.get("/api/project/user/:uid/organization", findOrganizationsForPoster);

    // / create an organization for a user
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
                        res.json(org);
                    }
                },
                function(error) {
                    // think about what error to send
                    res.send(error);
                }
            );

    }

    // add a review to the organization
    function submitReview(req, res) {
        var orgId = req.params.oid;
        var review = req.body;

        if(!orgId || !review || !review.from || !review.review) {
            res.status(400).send("Review must have not be blank");
            return;
        }

        organizationModel
            .findOrganizationById(orgId)
            .then(
                function(organization) {
                    if(!organization) {
                        res.status(400).send("Organization does not exist");
                    } else {
                        organization.reviews.push(review);
                        return organizationModel.updateOrganization(orgId, organization);
                    }
                },
                function(error) {
                    res.send(error);
                }
            )
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            )

    }

    // update an organization
    function updateOrganization(req, res) {
        var organization = req.body;
        var organizationId = req.params.oid;

        if(!organization || !organization.name) {
            res.status(400).send("Organization must have a name");
            return;
        }
        
        organizationModel
            .updateOrganization(organizationId, organization)
            .then(
                function(organization) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // remove an organization
    function removeOrganization(req, res) {
        var organizationId = req.params.oid;
        organizationModel
            .removeOrganization(organizationId)
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            );
        
    }

    // add a review to the organization
    function removeReview(req, res) {
        var orgId = req.params.oid;
        var reviewId = req.params.rid;

        if(!orgId || !reviewId) {
            res.status(400).send("Review does not exist");
            return;
        }

        organizationModel
            .findOrganizationById(orgId)
            .then(
                function(organization) {
                    if(!organization) {
                        res.status(400).send("Organization does not exist");
                    } else {
                        var index = -1;
                        for(var i = 0; i < organization.reviews.length; i++) {
                            var review = organization.reviews[i];
                            if(review._id.toString() === reviewId) {
                                index = i;
                                break;
                            }
                        }
                        if(index === -1) {
                            res.status(400).send("Review does not exist");
                        } else {
                            organization.reviews.splice(index, 1);
                            return organizationModel.updateOrganization(orgId, organization);
                        }
                    }
                },
                function(error) {
                    res.send(error);
                }
            )
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            )

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