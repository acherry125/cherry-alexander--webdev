module.exports = function(mongoose) {

    var OrganizationSchema = mongoose.Schema({
        _poster: {type: mongoose.Schema.Types.ObjectId, ref: "EventUser"},
        name: String,
        phone: String,
        location: String,
        description: String,
        events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
        dateCreated: Date
    }, {collection: "event-organization"});

    return OrganizationSchema;

};