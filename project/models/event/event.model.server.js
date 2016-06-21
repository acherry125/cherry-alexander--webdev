module.exports = function(mongoose) {

    var EventSchema = require("./event.schema.server.js")(mongoose);
    var Event = mongoose.model("Event", EventSchema);

    var api = {
        "createEvent": createEvent,
        "updateEvent": updateEvent,
        "removeEvent": removeEvent,
        "findEventById": findEventById,
        "findEventsByName": findEventsByName,
        "findEventsForOrganization": findEventsForOrganization
    };

    return api;

    function createEvent(organizationId, event) {
        event.dateCreated = new Date();
        event._organization = organizationId;
        return Event.create(event);
    }
    
    function updateEvent(eventId, event) {
        return Event.update(
            {_id: eventId},
            {$set:
            {
                name: event.name,
                description: event.description,
                date: event.date,
                time: event.time,
                location: event.location
            }
            }

        )
    }
    
    function removeEvent(organizationId, eventId) {
        return Event.remove({_id: eventId});
    }

    function findEventsByName(eventName) {
        return Event.find({name: eventName});
    }
    
    function findEventById(eventId) {
        return Event.findById(eventId);
    }
    
    function findEventsForOrganization(organizationId) {
        return Event.find({_organization : organizationId})
    }

    
};
    