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
    // find all events for an organization
    app.get("/api/project/organization/:oid/event", findEventForOrganization);

    // create an organization for a user
    function createEvent(req, res) {
        res.sendStatus(200);
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

    // find all organizations for a poster
    function findEventForOrganization(req, res) {
        res.sendStatus(200);
    }

};