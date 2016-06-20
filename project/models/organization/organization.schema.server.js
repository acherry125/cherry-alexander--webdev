module.exports = function(mongoose) {

    var OrganizationSchema = mongoose.Schema({
        name: String,
        phone: String,
        location: String,
        description: String,
        poster: {type: mongoose.Schema.Types.ObjectId, ref: "EventUser"},
        events: [{type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
        dateCreated: Date
    }, {collection: "event-organization"});

    return OrganizationSchema;

};