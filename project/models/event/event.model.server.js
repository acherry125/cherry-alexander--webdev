module.exports = function(mongoose) {

    var EventSchema = require("./event.schema.server.js")(mongoose);
    var Event = mongoose.model("Event", EventSchema);

    var api = {
        "createEvent": createEvent,
        "updateEvent": updateEvent,
        "removeEvent": removeEvent,
        "findEventById": findEventById,
        "findEventsForOrganization": findEventsForOrganization
    };
    
    function createEvent(organizationId, event) {
        return;
    }
    
    function updateEvent(eventId, event) {
        return;
    }
    
    function removeEvent(organizationId, eventId) {
        return;
    }
    
    function findEventById(eventId) {
        Event.findOne({_id: eventId});
    }
    
    function findEventsForOrganization(organizationId) {
        Event.find({_organization : organizationId})
    }
    
    return api;
    
};
    