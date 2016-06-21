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
    // find events by name (has query param)
    app.get("/api/project/event", findEventsByName);
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
    function findEventByName(req,res) {
        res.sendStatus(200);
    }


    // find all organizations for a poster
    function findEventsForOrganization(req, res) {
        res.sendStatus(200);
    }

};