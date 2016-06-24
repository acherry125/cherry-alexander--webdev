module.exports = function(mongoose) {

    var EventSchema = mongoose.Schema({
        _organization: {type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
        name: String,
        date: String,
        time: String,
        location: {address: String, place_id: String},
        // can use a regex to make the email too
        description: String,
        attendees: [{type: mongoose.Schema.Types.ObjectId, ref: "EventUser"}],
        images: [String],
        dateCreated: Date
    }, {collection: "event-event"});

    return EventSchema;

};