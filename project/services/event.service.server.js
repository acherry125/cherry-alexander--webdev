module.exports = function(app, models) {

    var eventModel = models.eventModel;

    // create an event for an organization
    app.post("/api/project/organization/:oid/event", createEvent);
    // update an event
    app.put("/api/project/event/:eid", updateEvent);
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
        res.sendStatus(200);
    }

    // remove an organization
    function removeEvent(req, res) {
        res.sendStatus(200);
    }

    // find an organization by id
    function findEventById(req,res) {
        res.sendStatus(200);
    }

    // find organizations by name
    function findEvents(req,res) {
        var eventName = req.query.eventName;
        if(eventName) {
            // username request
            eventModel
                .findEventsByName(eventName)
                .then(
                    function(event) {
                        if(event === null) {
                            res.status(404).send("Event " + eventName + " not found");
                        } else {
                            res.json(event);
                        }
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

};