module.exports = function(app, models) {

    var eventModel = models.eventModel;

    // create an event for an organization
    app.post("/api/project/organization/:oid/event", createEvent);
    // update an event
    app.put("/api/project/event/:eid", updateEvent);
    // add a follower to the event
    app.put("/api/project/event/:eid/follower", addFollower);
    // remove the follower from the event
    app.delete("/api/project/event/:eid/follower/:uid", removeFollower);
    // remove an event
    app.delete("/api/project/event/:eid", removeEvent);
    // find an event by id
    app.get("/api/project/event/:eid", findEventById);
    // find events
    app.get("/api/project/event", findEvents);
    // find all events for an organization
    app.get("/api/project/organization/:oid/event", findEventsForOrganization);



    // create an organization for a user
    function createEvent(req, res) {
        var event = req.body;
        var orgId = req.params.oid;

        if(!event || !event.name) {
            res.status(400).send("Event must have a name");
            return;
        }

        eventModel
            .createEvent(orgId, event)
            .then(
                function(event) {
                    if(event) {
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
    function updateEvent(req, res) {
        var eventId = req.params.eid;
        var event = req.body;

        if(!event || !event.name) {
            res.status(400).send("Event must have a name");
            return;
        }

        eventModel
            .updateEvent(eventId, event)
            .then(
                function(event) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // remove an organization
    function removeEvent(req, res) {
        var eventId = req.params.eid;
        eventModel
            .removeEvent(eventId)
            .then(
                function(response) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.send(error);
                }
            );
    }

    // find an organization by id
    function findEventById(req,res) {
        var eventId = req.params.eid;

        eventModel
            .findEventById(eventId)
            .then(
                function(event) {
                    if(event === null) {
                        res.status(404).send("Event not found");
                    } else {
                        res.json(event);
                    }
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // find organizations by name
    function findEvents(req,res) {
        var eventName = req.query.eventName;
        if(eventName) {
            // username request
            eventModel
                .findEventsByName(eventName)
                .then(
                    function(events) {
                        res.json({elements: events});
                    }, 
                    function(error) {
                        res.send(error);
                    }
                )
        } else {
            // all events request
            eventModel
                .findAllEvents()
                .then(
                    function(events) {
                        res.json({elements: events});
                    },
                    function(error) {
                        res.send(error);
                    }
                )
        }
    }


    // find all organizations for a poster
    function findEventsForOrganization(req, res) {
        var organizationId = req.params.oid;
        eventModel
            .findEventsForOrganization(organizationId)
            .then(
                function(events) {
                    res.json({elements: events});
                },
                function(error) {
                    res.send(error);
                }
            )
    }

    // adds a follower to the event
    function addFollower(req, res) {
        var eventId = req.params.eid;
        var userId = req.body.userId;
        res.send(200);
    }

    // removes the follower from the event
    function removeFollower(req, res) {
        var eventId = req.params.eid;
        var userId = req.params.uid;
        res.send(200);
    }

};