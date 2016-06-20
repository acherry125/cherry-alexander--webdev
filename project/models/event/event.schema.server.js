module.exports = function(mongoose) {

    var EventSchema = mongoose.Schema({
        name: String,
        date: String,
        time: String,
        location: String,
        // can use a regex to make the email too
        description: String,
        organization: {type: mongoose.Schema.Types.ObjectId, ref: "Organization"},
        dateCreated: Date
    }, {collection: "event-event"});

    return EventSchema;

};